import { GraphQLObjectType } from "graphql";
import { PersonalCreateMutation } from "./PersonalCreateMutation";
import { SkillGroupCreateMutation } from "./SkillGroupCreateMutation";
import { UserCreateMutation } from "./UserCreateMutation";

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        UserCreate: UserCreateMutation,
        PersonalCreate: PersonalCreateMutation,
        SkillGroupCreate: SkillGroupCreateMutation
    })
});
