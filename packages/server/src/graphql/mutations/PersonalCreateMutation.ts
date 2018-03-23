import { GraphQLNonNull, GraphQLString } from 'graphql';
import { ViewerOutputField, ViewerType } from '../types/ViewerType';

import { AuthService } from '../../services/AuthService';
import { InterviewrResolverContext } from '../context';
import { Personal } from '../../entities/Personal';
import { PersonalDataType } from '../types/PersonalDataType';
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
        viewer: ViewerOutputField,
        personal: { type: new GraphQLNonNull(PersonalDataType) }
    }),
    async mutateAndGetPayload(input: PersonalCreateMutationInput, context: InterviewrResolverContext, info) {
        const user = await context.container.get(AuthService).requireAuthenticated();
        const personalRepo = context.connection.getRepository(Personal);
        const personal = personalRepo.create({ ...input });
        personal.user = Promise.resolve(user);
        await personalRepo.save(personal);

        return {
            personal
        };
    }
});
