import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from "graphql";

import { GraphQLString } from "graphql/type/scalars";
import { InterviewrResolverContext } from "../context";
import { User } from "../../entities/User";
import { UserService } from "../../services/UserService";
import { UserType } from "../types/UserType";

export const LoginQueryResponseType = new GraphQLObjectType({
    name: 'LoginQueryResponse',
    fields: () => ({
        user: { type: new GraphQLNonNull(UserType) },
        token: { type: new GraphQLNonNull(GraphQLString) }
    })
})

export const LoginQueryType = {
    type: LoginQueryResponseType,
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(source, args, context, info) {        
        const userService = new UserService(context.connection);
        const payload = await userService.createUserToken(args.email, args.password);

        if (payload.user && payload.token) {
            context.res.cookie('jwt', payload.token);
        } else {
            context.res.clearCookie('jwt');
        }

        return payload;
    }
} as GraphQLFieldConfig<{}, InterviewrResolverContext, { email: string, password: string }>