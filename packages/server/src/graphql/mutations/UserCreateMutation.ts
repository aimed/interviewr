import { GraphQLNonNull, GraphQLString } from 'graphql';
import { MutationConfig, mutationWithClientMutationId } from 'graphql-relay';
import { User, UserCreateScope } from '../../entities/User';
import { ViewerOutputField, ViewerType } from '../types/ViewerType';

import { InterviewrResolverContext } from '../context';
import { UserService } from '../../services/UserService';
import { UserType } from '../types/UserType';
import { graphQLReflector } from '../GraphQLReflector';

export interface UserCreateMutationInput {
    email: string;
    password: string;
}

export const UserCreateMutation = mutationWithClientMutationId({
    name: 'UserCreate',
    inputFields: {
        ...graphQLReflector.getInputFields(User, UserCreateScope)
    },
    outputFields: {
        user: { type: new GraphQLNonNull(UserType) },
        token: { type: new GraphQLNonNull(GraphQLString) },
        viewer: ViewerOutputField
    },
    async mutateAndGetPayload(object: UserCreateMutationInput, context: InterviewrResolverContext, info) {
        const userService = new UserService(context.connection);
        const user = await userService.createUser(object.email, object.password);
        const { token } = await userService.createUserToken(user.email, object.password);

        return {
            token,
            user
        };
    }
});
