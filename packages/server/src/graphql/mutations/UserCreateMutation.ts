import { GraphQLNonNull, GraphQLString } from "graphql";
import { MutationConfig, mutationWithClientMutationId } from "graphql-relay";

import { InterviewrResolverContext } from "../context";
import { User } from "../../entities/User";
import { UserService } from "../../services/UserService";
import { UserType } from "../types/UserType";

export const UserCreateMutation = mutationWithClientMutationId({
    name: 'UserCreate',
    inputFields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
        user: { type: UserType }
    },
    mutateAndGetPayload(object: { email: string, password: string }, context: InterviewrResolverContext, info) {                     
        const userService = new UserService(context.connection);        
        const user = userService.createUser(object.email, object.password);
        return { user };
    }
});
