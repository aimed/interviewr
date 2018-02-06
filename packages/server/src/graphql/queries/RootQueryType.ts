import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from "graphql";

import { InterviewrResolverContext } from "../context";
import { User } from "../../entities/User";
import { UserType } from "../types/UserType";
import { nodeField } from "../nodeDefinitions";

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        node: nodeField,
        hello: {
            type: GraphQLString,
            resolve() {
                return 'world';
            }
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
            resolve(source, args, context) {
                const userRepo = context.connection.getRepository(User);
                return userRepo.findOneById(args.id);
            }
        }
    })
} as GraphQLObjectTypeConfig<{}, InterviewrResolverContext>)