import { GraphQLNonNull, GraphQLString } from "graphql";
import { MutationConfig, mutationWithClientMutationId } from "graphql-relay";

import { InterviewrResolverContext } from "../context";
import { User } from "../../entities/User";
import { UserService } from "../../services/UserService";
import { UserType } from "../types/UserType";
import { ViewerType } from "../types/ViewerType";

interface UserCreateMutationInput { 
    email: string;
    password: string;
};

export const UserCreateMutation = mutationWithClientMutationId({
    name: 'UserCreate',
    inputFields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
        user: { type: new GraphQLNonNull(UserType) },
        token: { type: new GraphQLNonNull(GraphQLString) },
        viewer: { type: new GraphQLNonNull(ViewerType) }
    },
    async mutateAndGetPayload(object: UserCreateMutationInput, context: InterviewrResolverContext, info) {                     
        const userService = new UserService(context.connection);        
        const user = await userService.createUser(object.email, object.password);
        const { token } = await userService.createUserToken(user.email, object.password);
        
        return { 
            token, 
            user, 
            viewer: {} 
        };
    }
});
