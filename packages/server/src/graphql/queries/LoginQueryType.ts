import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from "graphql";

import { GraphQLString } from "graphql/type/scalars";
import { InterviewrResolverContext } from "../context";
import { User } from "../../entities/User";
import { UserService } from "../../services/UserService";
import { ViewerType } from "../types/ViewerType";

export const LoginQueryResponseType = new GraphQLObjectType({
    name: 'LoginQueryResponse',
    fields: () => ({
        viewer: { type: new GraphQLNonNull(ViewerType) },
        token: { type: new GraphQLNonNull(GraphQLString) }
    })
});

export const LoginQueryType = {
    type: new GraphQLNonNull(LoginQueryResponseType),
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(source, args, context, info) {        
        const userService = new UserService(context.connection);
        const payload = await userService.createUserToken(args.email, args.password);
        
        if (payload.user && payload.token) {
            context.authService.setRequestUser(payload.user, payload.token);
        } else {
            context.authService.clearRequestUser();
        }

        return {
            token: payload.token,
            viewer: {}
        };
    }
} as GraphQLFieldConfig<{}, InterviewrResolverContext, { email: string, password: string }>