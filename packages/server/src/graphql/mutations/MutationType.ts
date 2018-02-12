import { EducationCreateMutation } from './EducationCreateMutation';
import { GraphQLObjectType } from 'graphql';
import { PersonalCreateMutation } from './PersonalCreateMutation';
import { SkillCreateMutation } from './SkillCreateMutation';
import { SkillGroupCreateMutation } from './SkillGroupCreateMutation';
import { UserCreateMutation } from './UserCreateMutation';
import { WorkCreateMutation } from './WorkCreateMutation';

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        UserCreate: UserCreateMutation,
        PersonalCreate: PersonalCreateMutation,
        SkillGroupCreate: SkillGroupCreateMutation,
        SkillCreate: SkillCreateMutation,
        EducationCreate: EducationCreateMutation,
        WorkCreate: WorkCreateMutation
    })
});
