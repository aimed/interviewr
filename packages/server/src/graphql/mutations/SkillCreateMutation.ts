import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";

import { InterviewrResolverContext } from "../context";
import { Skill } from "../../entities/Skill";
import { SkillGroup } from "../../entities/SkillGroup";
import { SkillType } from "../types/SkillType";
import { ViewerType } from "../types/ViewerType";
import { mutationWithClientMutationId } from "graphql-relay";
import { safeIdFetcher } from "../nodeDefinitions";

interface SkillCreateMutationInput {
    skillGroup: string;
    description: string;
}

export const SkillCreateMutation = mutationWithClientMutationId({
    name: 'SkillCreate',
    inputFields: () => ({
        skillGroup: { 
            type: new GraphQLNonNull(GraphQLID)
        },
        description: { type: new GraphQLNonNull(GraphQLString) }
    }),
    outputFields: () => ({
        skill: { type: new GraphQLNonNull(SkillType) },
        viewer: { type: new GraphQLNonNull(ViewerType) }
    }),
    async mutateAndGetPayload(object: SkillCreateMutationInput, context: InterviewrResolverContext, info) {
        const { skillGroup, ...skillData } = object;
        const user = await context.authService.requireAuthenticated();
        const skillGroupInstance = await safeIdFetcher<SkillGroup>(skillGroup, context);
        const skillRepo = context.connection.getRepository(Skill);
        const skill = skillRepo.create(skillData);
        skill.group = Promise.resolve(skillGroupInstance);
        skill.user = Promise.resolve(user);
        await skillRepo.save(skill);
        
        return {
            skill,
            viewer: {}
        };
    }
});
