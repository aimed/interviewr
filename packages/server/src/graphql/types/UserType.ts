import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString } from 'graphql';
import { User, UserTypeScope } from '../../entities/User';
import { graphQlIDField, graphlQLObjectName } from '../utils';

import { ApplicationType } from './ApplicationType';
import { AuthService } from '../../services/AuthService';
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
            async resolve(source, args, context) {
                await context.container.get(AuthService).permissionSelfOrAdmin(source);
                return source.personalData;
            }
        },
        skills: {
            type: new GraphQLNonNull(new GraphQLList(SkillType)),
            async resolve(source, args, context) {
                await context.container.get(AuthService).permissionSelfOrAdmin(source);
                return source.skills;
            }
        },
        skillGroups: {
            type: new GraphQLNonNull(new GraphQLList(SkillGroupType)),
            async resolve(source, args, context) {
                await context.container.get(AuthService).permissionSelfOrAdmin(source);
                return source.skillGroups;
            }
        },
        education: {
            type: new GraphQLNonNull(new GraphQLList(EducationType)),
            async resolve(source, args, context) {
                await context.container.get(AuthService).permissionSelfOrAdmin(source);
                return source.education;
            }
        },
        work: {
            type: new GraphQLNonNull(new GraphQLList(WorkType)),
            async resolve(source, args, context) {
                await context.container.get(AuthService).permissionSelfOrAdmin(source);
                return source.work;
            }
        },
        applications: {
            type: new GraphQLNonNull(new GraphQLList(ApplicationType)),
            async resolve(source, args, context) {
                await context.container.get(AuthService).permissionSelfOrAdmin(source);
                return source.applications;
            }
        }
    })
} as GraphQLObjectTypeConfig<User, InterviewrResolverContext>);
