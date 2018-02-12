import { GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from '../utils';

import { InterviewrResolverContext } from '../context';
import { Skill } from '../../entities/Skill';
import { SkillGroupType } from './SkillGroupType';
import { graphQLReflector } from '../GraphQLReflector';
import { nodeInterface } from '../nodeDefinitions';

export const SkillType = new GraphQLObjectType({
    name: graphlQLObjectName(Skill),
    interfaces: [nodeInterface],
    fields: () => ({
        ...graphQLReflector.getOutputFields(Skill),
        skillGroup: {
            type: new GraphQLNonNull(SkillGroupType),
            resolve(source, args, context) {
                return source.group;
            }
        }
    })
} as GraphQLObjectTypeConfig<Skill, InterviewrResolverContext>);
