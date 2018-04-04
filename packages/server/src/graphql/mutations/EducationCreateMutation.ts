import { ViewerOutputField, ViewerType } from '../types/ViewerType';

import { AuthService } from '../../services/AuthService';
import { Education } from '../../entities/Education';
import { EducationType } from '../types/EducationType';
import { GraphQLNonNull } from 'graphql';
import { InterviewrResolverContext } from '../context';
import { graphQLReflector } from '../GraphQLReflector';
import { mutationWithClientMutationId } from 'graphql-relay';

interface EducationCreateMutationInput {
    institution: string;
    startDate: string;
    endDate: string;
    description: string;
    degree: string;
}

export const EducationCreateMutation = mutationWithClientMutationId({
    name: 'EducationCreate',
    inputFields: {
        ...graphQLReflector.getInputFields(Education)
    },
    outputFields: {
        education: { type: new GraphQLNonNull(EducationType) },
        viewer: ViewerOutputField
    },
    async mutateAndGetPayload(object: EducationCreateMutationInput, context: InterviewrResolverContext, info) {
        const user = await context.container.get(AuthService).requireAuthenticated();
        const repo = context.connection.getRepository(Education);
        const education = repo.create({ ...object });
        education.user = Promise.resolve(user);
        await repo.save(education);

        return {
            education
        };
    }
});
