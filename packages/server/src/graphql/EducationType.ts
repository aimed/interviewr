import { GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from './utils';

import { Education } from "../entities/Education";
import { InterviewrResolverContext } from "./context";
import { nodeInterface } from './nodeDefinitions';

export const EducationType = new GraphQLObjectType({
    name: graphlQLObjectName(Education),
    interfaces: [nodeInterface],
    fields: () => ({
        id: graphQlIDField(Education, e => e.id),
        institution: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        degree: { type: new GraphQLNonNull(GraphQLString) },
        startDate: { type: new GraphQLNonNull(GraphQLString) },
        endDate: { type: GraphQLString }
    })
} as GraphQLObjectTypeConfig<Education, InterviewrResolverContext>);
