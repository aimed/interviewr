import { GraphQLNonNull, GraphQLString } from "graphql";

import { InterviewrResolverContext } from "../context";
import { Personal } from "../../entities/Personal";
import { PersonalDataType } from "../types/PersonalDataType";
import { ViewerType } from "../types/ViewerType";
import { mutationWithClientMutationId } from "graphql-relay";

interface PersonalCreateMutationInput {
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
};

export const PersonalCreateMutation = mutationWithClientMutationId({
    name: 'PersonalCreate',
    inputFields: () => ({
        nationality: { type: GraphQLString },
        martialStatus: { type: GraphQLString },
        numberOfChildren: { type: GraphQLString },
        phone: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        birthPlace: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        addressLine1: { type: GraphQLString },
        addressLine2: { type: GraphQLString },
        addressLine3: { type: GraphQLString },
        addressLine4: { type: GraphQLString },
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
