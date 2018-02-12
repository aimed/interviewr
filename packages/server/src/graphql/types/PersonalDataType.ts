import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from '../utils';

import { InterviewrResolverContext } from '../context';
import { Personal } from '../../entities/Personal';
import { graphQLReflector } from '../GraphQLReflector';
import { nodeInterface } from '../nodeDefinitions';

export const PersonalDataType = new GraphQLObjectType({
    name: graphlQLObjectName(Personal),
    interfaces: [nodeInterface],
    fields: () => ({
        ...graphQLReflector.getOutputFields(Personal)
    })
} as GraphQLObjectTypeConfig<Personal, InterviewrResolverContext>);
