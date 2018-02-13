import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { User, UserTypeScope } from '../../entities/User';
import { graphQlIDField, graphlQLObjectName } from '../utils';

import { ApplicationType } from './ApplicationType';
import { EducationType } from './EducationType';
import { InterviewrResolverContext } from '../context';
import { PersonalDataType } from './PersonalDataType';
import { SkillGroupType } from './SkillGroupType';
import { SkillType } from './SkillType';
import { WorkType } from './WorkType';
import { graphQLReflector } from '../GraphQLReflector';
import { nodeInterface } from '../nodeDefinitions';

export const UserType = new GraphQLObjectType({
    name: graphlQLObjectName(User),
    interfaces: [nodeInterface],
    fields: () => ({
        ...graphQLReflector.getOutputFields(User, UserTypeScope),
        personal: {
            type: new GraphQLNonNull(new GraphQLList(PersonalDataType)),
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
        skillGroups: {
            type: new GraphQLNonNull(new GraphQLList(SkillGroupType)),
            resolve(source, args, context) {
                return source.skillGroups;
            }
        },
        education: {
            type: new GraphQLNonNull(new GraphQLList(EducationType)),
            resolve(source, args, context) {
                return source.education;
            }
        },
        work: {
            type: new GraphQLNonNull(new GraphQLList(WorkType)),
            resolve(source, args, context) {
                return source.work;
            }
        },
        applications: {
            type: new GraphQLNonNull(new GraphQLList(ApplicationType)),
            resolve(source, args, context) {
                return source.applications;
            }
        }
    })
} as GraphQLObjectTypeConfig<User, InterviewrResolverContext>);
