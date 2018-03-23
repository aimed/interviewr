import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { Application } from '../../entities/Application';
import { ApplicationType } from '../types/ApplicationType';
import { InterviewrResolverContext } from '../context';

interface ApplicationQueryArgs {
    accessCode: string;
}

export const ApplicationQueryType: GraphQLFieldConfig<{}, InterviewrResolverContext, ApplicationQueryArgs> = {
    type: ApplicationType,
    args: {
        accessCode: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(source, args, context, info) {
        const applicationRepo = context.connection.getRepository(Application);
        const application = await applicationRepo.findOne(); // TODO: Add access code
        return { application };
    }
};
