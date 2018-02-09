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
        nationality: { type: GraphQLString },
        martialStatus: { type: GraphQLString },
        numberOfChildren: { type: GraphQLString },
        phone: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        birthPlace: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        addressLine1: { type: GraphQLString },
        addressLine2: { type: GraphQLString },
        addressLine3: { type: GraphQLString },
        addressLine4: { type: GraphQLString },
    })
} as GraphQLObjectTypeConfig<Personal, InterviewrResolverContext>);

