import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { ViewerOutputField, ViewerType } from '../types/ViewerType';

import { AuthService } from '../../services/AuthService';
import { InterviewrResolverContext } from '../context';
import { Skill } from '../../entities/Skill';
import { SkillGroup } from '../../entities/SkillGroup';
import { SkillType } from '../types/SkillType';
import { graphQLReflector } from '../GraphQLReflector';
import { mutationWithClientMutationId } from 'graphql-relay';
import { safeIdFetcher } from '../nodeDefinitions';

interface SkillCreateMutationInput {
    skillGroup: string;
    description: string;
}

export const SkillCreateMutation = mutationWithClientMutationId({
    name: 'SkillCreate',
    inputFields: () => ({
        skillGroup: { type: new GraphQLNonNull(GraphQLID) },
        ...graphQLReflector.getInputFields(Skill)
    }),
    outputFields: () => ({
        skill: { type: new GraphQLNonNull(SkillType) },
        viewer: ViewerOutputField
    }),
    async mutateAndGetPayload(object: SkillCreateMutationInput, context: InterviewrResolverContext, info) {
        const { skillGroup, ...skillData } = object;
        const user = await context.container.get(AuthService).requireAuthenticated();
        const skillGroupInstance = await safeIdFetcher<SkillGroup>(skillGroup, context);
        const skillRepo = context.connection.getRepository(Skill);
        const skill = skillRepo.create({ ...skillData });
        skill.group = Promise.resolve(skillGroupInstance);
        skill.user = Promise.resolve(user);
        await skillRepo.save(skill);

        return {
            skill
        };
    }
});
