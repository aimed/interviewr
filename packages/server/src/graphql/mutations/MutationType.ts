import { GraphQLObjectType } from "graphql";
import { PersonalCreateMutation } from "./PersonalCreateMutation";
import { SkillCreateMutation } from "./SkillCreateMutation";
import { SkillGroupCreateMutation } from "./SkillGroupCreateMutation";
import { UserCreateMutation } from "./UserCreateMutation";

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        UserCreate: UserCreateMutation,
        PersonalCreate: PersonalCreateMutation,
        SkillGroupCreate: SkillGroupCreateMutation,
        SkillCreate: SkillCreateMutation
    })
});
