import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';

import { ApplicationQueryType } from './ApplicationQueryType';
import { InterviewrResolverContext } from '../context';
import { LoginQueryType } from './LoginQueryType';
import { LogoutQueryType } from './LogoutQueryType';
import { User } from '../../entities/User';
import { ViewerType } from '../types/ViewerType';
import { nodeField } from '../nodeDefinitions';

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        node: nodeField,
        viewer: {
            type: ViewerType,
            resolve(source, args, context) {
                return {};
            }
        },
        hello: {
            type: GraphQLString,
            resolve() {
                return 'world';
            }
        },
        login: LoginQueryType,
        logout: LogoutQueryType,
        application: ApplicationQueryType
    })
} as GraphQLObjectTypeConfig<{}, InterviewrResolverContext>);
