import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLOutputType } from 'graphql';

import { AuthService } from '../../services/AuthService';
import { InterviewrResolverContext } from '../context';
import { UserType } from './UserType';
import { nodeInterface } from '../nodeDefinitions';
import { toGlobalId } from 'graphql-relay';

export const ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    intefaces: [nodeInterface],
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve() {
                return toGlobalId('Viewer', '0');
            }
        },
        user: {
            type: UserType,
            resolve(source, args, context) {
                return context.container.get(AuthService).getRequestUser();
            }
        }
    })
} as GraphQLObjectTypeConfig<{}, InterviewrResolverContext>);

export const ViewerOutputField = {
    type: new GraphQLNonNull(ViewerType),
    resolve() {
        return {};
    }
} as GraphQLFieldConfig<any, any>;
