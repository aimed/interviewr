import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { graphQlIDField, graphlQLObjectName } from '../utils';

import { EducationType } from './EducationType';
import { InterviewrResolverContext } from '../context';
import { PersonalDataType } from './PersonalDataType';
import { SkillType } from './SkillType';
import { User } from '../../entities/User';
import { nodeInterface } from '../nodeDefinitions';

export const UserType = new GraphQLObjectType({
    name: graphlQLObjectName(User),
    interfaces: [nodeInterface],
    fields: () => ({
        id: graphQlIDField(User, u => u.id),
        email: { type: new GraphQLNonNull(GraphQLString) },
        personal: { 
            type: new GraphQLNonNull(PersonalDataType),
            resolve(source, args, context) {
                return source.personalData;
            }
        },
        skills: {
            type: new GraphQLNonNull(new GraphQLList(SkillType)),
            resolve(source, args, context) {
                return source.skills;
            }
        },
        education: {
            type: new GraphQLNonNull(new GraphQLList(EducationType)),
            resolve(source, args, context) {
                return source.education;
            }
        }
    })
} as GraphQLObjectTypeConfig<User, InterviewrResolverContext>);

