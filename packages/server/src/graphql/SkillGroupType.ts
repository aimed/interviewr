import { GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from "./utils";

import { InterviewrResolverContext } from './context';
import { SkillGroup } from '../entities/SkillGroup';
import { nodeInterface } from './nodeDefinitions';

export const SkillGroupType = new GraphQLObjectType({
    name: graphlQLObjectName(SkillGroup),
    interfaces: [nodeInterface],
    fields: () => ({
        id: graphQlIDField(SkillGroup, s => s.id),
        title: { type: new GraphQLNonNull(GraphQLString) }
    })
} as GraphQLObjectTypeConfig<SkillGroup, InterviewrResolverContext>);

