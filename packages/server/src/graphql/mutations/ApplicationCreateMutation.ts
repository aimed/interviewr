import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { ViewerOutputField, ViewerType } from '../types/ViewerType';

import { Application } from '../../entities/Application';
import { ApplicationType } from '../types/ApplicationType';
import { AuthService } from '../../services/AuthService';
import { Education } from '../../entities/Education';
import { InterviewrResolverContext } from '../context';
import { Personal } from '../../entities/Personal';
import { Skill } from '../../entities/Skill';
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
        viewer: ViewerOutputField
    },
    async mutateAndGetPayload(object: ApplicationCreateMutationInput, context: InterviewrResolverContext, info) {
        const { personal, work, education, skills, ...data } = object;
        const user = await context.container.get(AuthService).requireAuthenticated();
        const repo = context.connection.getRepository(Application);
        const application = repo.create({
            user: Promise.resolve(user),
            personal: safeIdFetcher<Personal>(personal, context),
            work: Promise.all(work.map(w => safeIdFetcher<Work>(w, context))),
            education: Promise.all(education.map(e => safeIdFetcher<Education>(e, context))),
            skills: Promise.all(skills.map(s => safeIdFetcher<Skill>(s, context))),
            ...data
        });
        await repo.save(application);
        return { application };
    }
});
