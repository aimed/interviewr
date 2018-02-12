import { GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from '../utils';

import { Education } from '../../entities/Education';
import { InterviewrResolverContext } from '../context';
import { graphQLReflector } from '../GraphQLReflector';
import { nodeInterface } from '../nodeDefinitions';

export const EducationType = new GraphQLObjectType({
    name: graphlQLObjectName(Education),
    interfaces: [nodeInterface],
    fields: () => ({
        ...graphQLReflector.getOutputFields(Education)
    })
} as GraphQLObjectTypeConfig<Education, InterviewrResolverContext>);
