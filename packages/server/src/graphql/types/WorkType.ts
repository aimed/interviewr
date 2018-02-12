import { GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from '../utils';

import { InterviewrResolverContext } from '../context';
import { Work } from '../../entities/Work';
import { graphQLReflector } from '../GraphQLReflector';
import { nodeInterface } from '../nodeDefinitions';

export const WorkType = new GraphQLObjectType({
    name: graphlQLObjectName(Work),
    interfaces: [nodeInterface],
    fields: () => ({
        ...graphQLReflector.getOutputFields(Work)
    })
} as GraphQLObjectTypeConfig<Work, InterviewrResolverContext>);
