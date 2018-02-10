import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from "../utils";

import { InterviewrResolverContext } from '../context';
import { SkillGroup } from '../../entities/SkillGroup';
import { SkillType } from './SkillType';
import { UserType } from './UserType';
import { nodeInterface } from '../nodeDefinitions';

export const SkillGroupType = new GraphQLObjectType({
    name: graphlQLObjectName(SkillGroup),
    interfaces: [nodeInterface],
    fields: () => ({
        id: graphQlIDField(SkillGroup, s => s.id),
        title: { type: new GraphQLNonNull(GraphQLString) },
        user: { 
            type: new GraphQLNonNull(UserType),
            resolve(source, args, context) {
                return source.user;
            }
        },
        skills: {
            type: new GraphQLNonNull(new GraphQLList(SkillType)),
            resolve(source, args, context) {
                return source.skills;
            }
        }
    })
} as GraphQLObjectTypeConfig<SkillGroup, InterviewrResolverContext>);

