import { GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from "./utils";

import { InterviewrResolverContext } from './context';
import { Work } from "../entities/Work";
import { nodeInterface } from './nodeDefinitions';

export const WorkType = new GraphQLObjectType({
    name: graphlQLObjectName(Work),
    interfaces: [nodeInterface],
    fields: () => ({
        id: graphQlIDField(Work, work => work.id),
        startDate: { type: new GraphQLNonNull(GraphQLString) },
        endDate: { type: GraphQLString },
        description: { type: new GraphQLNonNull(GraphQLString) },
        employer: { type: new GraphQLNonNull(GraphQLString) }
    })
} as GraphQLObjectTypeConfig<Work, InterviewrResolverContext>);
