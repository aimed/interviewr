import { GraphQLNonNull, GraphQLString } from "graphql";

import { InterviewrResolverContext } from "../context";
import { SkillGroup } from "../../entities/SkillGroup";
import { SkillGroupType } from "../types/SkillGroupType";
import { ViewerType } from "../types/ViewerType";
import { mutationWithClientMutationId } from "graphql-relay";

interface SkillGroupCreateMutationInput {
    title: string;
}

export const SkillGroupCreateMutation = mutationWithClientMutationId({
    name: 'SkillGroupCreate',
    inputFields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) }
    }),
    outputFields: () => ({
        viewer: { type: new GraphQLNonNull(ViewerType) },
        skillGroup: { type: new GraphQLNonNull(SkillGroupType) }
    }),
    async mutateAndGetPayload(object: SkillGroupCreateMutationInput, context: InterviewrResolverContext, info) {
        const user = await context.authService.requireAuthenticated();
        const skillGroupRepo = context.connection.getRepository(SkillGroup);
        const skillGroup = skillGroupRepo.create(object);
        skillGroup.user = Promise.resolve(user);
        
        await skillGroupRepo.save(skillGroup);
        
        return {
            viewer: {},
            skillGroup
        }
    }
})