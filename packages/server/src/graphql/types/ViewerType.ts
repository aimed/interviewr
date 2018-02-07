import { GraphQLObjectType, GraphQLObjectTypeConfig } from "graphql";

import { InterviewrResolverContext } from "../context";
import { UserType } from "./UserType";

export const ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        user: { 
            type: UserType
        }
    })
} as GraphQLObjectTypeConfig<{}, InterviewrResolverContext>);
