import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import { Application } from '../../entities/Application';
import { ApplicationType } from '../types/ApplicationType';
import { Education } from '../../entities/Education';
import { InterviewrResolverContext } from '../context';
import { Personal } from '../../entities/Personal';
import { Skill } from '../../entities/Skill';
import { ViewerType } from '../types/ViewerType';
import { Work } from '../../entities/Work';
import { graphQLReflector } from '../GraphQLReflector';
import { mutationWithClientMutationId } from 'graphql-relay';
import { safeIdFetcher } from '../nodeDefinitions';

interface ApplicationCreateMutationInput {
    text: string;
    draft: boolean;
    work: string[];
    education: string[];
    personal: string;
    skills: string[];
}

export const ApplicationCreateMutation = mutationWithClientMutationId({
    name: 'ApplicationCreate',
    inputFields: {
        ...graphQLReflector.getInputFields(Application),
        work: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        education: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        personal: { type: new GraphQLNonNull(GraphQLID) },
        skills: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) }
    },
    outputFields: {
        application: { type: new GraphQLNonNull(ApplicationType) },
        viewer: { type: new GraphQLNonNull(ViewerType) }
    },
    async mutateAndGetPayload(object: ApplicationCreateMutationInput, context: InterviewrResolverContext, info) {
        const { personal, work, education, skills, ...data } = object;
        const user = await context.authService.requireAuthenticated();
        const repo = context.connection.getRepository(Application);
        const application = repo.create(data);
        application.user = Promise.resolve(user);
        application.personal = safeIdFetcher<Personal>(personal, context);
        application.work = Promise.all(work.map(w => safeIdFetcher<Work>(w, context)));
        application.education = Promise.all(education.map(e => safeIdFetcher<Education>(e, context)));
        application.skills = Promise.all(skills.map(s => safeIdFetcher<Skill>(s, context)));
        await repo.save(application);
        return { application, viewer: {} };
    }
});
