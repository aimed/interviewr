import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from "graphql";

import { InterviewrResolverContext } from "../context";
import { ViewerType } from "../types/ViewerType";

export const LogoutQueryResponseType = new GraphQLObjectType({
    name: 'LogoutQueryResponse',
    fields: () => ({
        viewer: { type: new GraphQLNonNull(ViewerType) }
    })
});

export const LogoutQueryType = {
    type: new GraphQLNonNull(LogoutQueryResponseType),
    resolve(source, args, context) {
        context.res.clearCookie('jwt');
        context.user = null;
        
        return {
            viewer: {}
        };
    }
} as GraphQLFieldConfig<{}, InterviewrResolverContext>;