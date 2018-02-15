import { GraphQLFieldConfig, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLOutputType } from 'graphql';

import { InterviewrResolverContext } from '../context';
import { UserType } from './UserType';

export const ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        user: {
            type: UserType,
            resolve(source, args, context) {
                return context.authService.getRequestUser();
            }
        }
    })
} as GraphQLObjectTypeConfig<{}, InterviewrResolverContext>);

export const ViewerOutputField = {
    type: ViewerType,
    resolve() {
        return {};
    }
} as GraphQLFieldConfig<any, any>;
