import { ViewerOutputField, ViewerType } from '../types/ViewerType';

import { AuthService } from '../../services/AuthService';
import { GraphQLNonNull } from 'graphql';
import { InterviewrResolverContext } from '../context';
import { User } from '../../entities/User';
import { Work } from '../../entities/Work';
import { WorkType } from '../types/WorkType';
import { graphQLReflector } from '../GraphQLReflector';
import { mutationWithClientMutationId } from 'graphql-relay';

interface WorkCreateMutationInput {
    description: string;
    employer: string;
    startDate: string;
    endDate: string;
}

export const WorkCreateMutation = mutationWithClientMutationId({
    name: 'WorkCreate',
    inputFields: {
        ...graphQLReflector.getInputFields(Work)
    },
    outputFields: {
        viewer: ViewerOutputField,
        work: { type: new GraphQLNonNull(WorkType) }
    },
    async mutateAndGetPayload(object: {}, context: InterviewrResolverContext, info) {
        const user = await context.container.get(AuthService).requireAuthenticated();
        const repo = context.connection.getRepository(Work);
        const work = repo.create({ ...object });
        work.user = Promise.resolve(user);
        await repo.save(work);

        return {
            work
        };
    }
});
