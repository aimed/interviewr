import { GraphQLNonNull, GraphQLString } from 'graphql';
import { ViewerOutputField, ViewerType } from '../types/ViewerType';

import { InterviewrResolverContext } from '../context';
import { SkillGroup } from '../../entities/SkillGroup';
import { SkillGroupType } from '../types/SkillGroupType';
import { graphQLReflector } from '../GraphQLReflector';
import { mutationWithClientMutationId } from 'graphql-relay';

interface SkillGroupCreateMutationInput {
    title: string;
}

export const SkillGroupCreateMutation = mutationWithClientMutationId({
    name: 'SkillGroupCreate',
    inputFields: () => ({
        ...graphQLReflector.getInputFields(SkillGroup)
    }),
    outputFields: () => ({
        viewer: ViewerOutputField,
        skillGroup: { type: new GraphQLNonNull(SkillGroupType) }
    }),
    async mutateAndGetPayload(object: SkillGroupCreateMutationInput, context: InterviewrResolverContext, info) {
        const user = await context.authService.requireAuthenticated();
        const skillGroupRepo = context.connection.getRepository(SkillGroup);
        const skillGroup = skillGroupRepo.create(object);
        skillGroup.user = Promise.resolve(user);

        await skillGroupRepo.save(skillGroup);

        return {
            skillGroup
        };
    }
});
