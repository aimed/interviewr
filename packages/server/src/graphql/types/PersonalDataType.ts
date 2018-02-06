import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from '../utils';

import { InterviewrResolverContext } from '../context';
import { Personal } from '../../entities/Personal';
import { nodeInterface } from '../nodeDefinitions';

export const PersonalDataType = new GraphQLObjectType({
    name: graphlQLObjectName(Personal),
    interfaces: [nodeInterface],
    fields: () => ({
        id: graphQlIDField(Personal, p => p.id),
        nationality: { type: new GraphQLNonNull(GraphQLString) },
        martialStatus: { type: new GraphQLNonNull(GraphQLString) },
        numberOfChildren: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        birthDate: { type: new GraphQLNonNull(GraphQLString) },
        birthPlace: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        addressLine1: { type: new GraphQLNonNull(GraphQLString) },
        addressLine2: { type: new GraphQLNonNull(GraphQLString) },
        addressLine3: { type: new GraphQLNonNull(GraphQLString) },
        addressLine4: { type: new GraphQLNonNull(GraphQLString) },
    })
} as GraphQLObjectTypeConfig<Personal, InterviewrResolverContext>);

