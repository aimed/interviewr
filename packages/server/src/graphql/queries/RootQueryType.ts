import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from "graphql";

import { InterviewrResolverContext } from "../context";
import { LoginQueryType } from "./LoginQueryType";
import { User } from "../../entities/User";
import { ViewerType } from "../types/ViewerType";
import { nodeField } from "../nodeDefinitions";

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        node: nodeField,
        viewer: { 
            type: ViewerType,
            resolve(source, args, context) {
                const { user } = context;
                return { user };
            }
        },
        hello: {
            type: GraphQLString,
            resolve() {
                return 'world';
            }
        },
        login: LoginQueryType
    })
} as GraphQLObjectTypeConfig<{}, InterviewrResolverContext>)