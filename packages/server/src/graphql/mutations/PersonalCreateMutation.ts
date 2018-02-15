import { GraphQLNonNull, GraphQLString } from 'graphql';

import { InterviewrResolverContext } from '../context';
import { Personal } from '../../entities/Personal';
import { PersonalDataType } from '../types/PersonalDataType';
import { ViewerType } from '../types/ViewerType';
import { graphQLReflector } from '../GraphQLReflector';
import { mutationWithClientMutationId } from 'graphql-relay';

export interface PersonalCreateMutationInput {
    nationality: string;
    martialStatus: string;
    numberOfChildren: string;
    phone: string;
    birthDate: string;
    birthPlace: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
}

export const PersonalCreateMutation = mutationWithClientMutationId({
    name: 'PersonalCreate',
    inputFields: () => ({
        ...graphQLReflector.getInputFields(Personal)
    }),
    outputFields: () => ({
        viewer: { type: new GraphQLNonNull(ViewerType) },
        personal: { type: new GraphQLNonNull(PersonalDataType) }
    }),
    async mutateAndGetPayload(object: PersonalCreateMutationInput, context: InterviewrResolverContext, info) {
        const user = await context.authService.requireAuthenticated();
        const personalRepo = context.connection.getRepository(Personal);
        const personal = personalRepo.create(object);
        personal.user = Promise.resolve(user);
        await personalRepo.save(personal);

        return {
            personal,
            viewer: {}
        };
    }
});
