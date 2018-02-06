import { GraphQLObjectType } from "graphql";
import { UserCreateMutation } from "./UserCreateMutation";

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        UserCreate: UserCreateMutation
    })
});
