import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ViewerOutputField, ViewerType } from '../types/ViewerType';

import { AuthService } from '../../services/AuthService';
import { InterviewrResolverContext } from '../context';

export const LogoutQueryResponseType = new GraphQLObjectType({
    name: 'LogoutQueryResponse',
    fields: () => ({
        viewer: ViewerOutputField
    })
});

export const LogoutQueryType = {
    type: new GraphQLNonNull(LogoutQueryResponseType),
    resolve(source, args, context) {
        context.container.get(AuthService).clearRequestUser();

        return {};
    }
} as GraphQLFieldConfig<{}, InterviewrResolverContext>;
