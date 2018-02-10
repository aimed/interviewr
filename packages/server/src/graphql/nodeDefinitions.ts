import { fromGlobalId, nodeDefinitions } from "graphql-relay";

import { GraphQLResolveInfo } from "graphql";
import { InterviewrResolverContext } from "./context";

export const idFetcher = <T>(globalId: string, context: InterviewrResolverContext, info?: GraphQLResolveInfo): Promise<T | null> => {
    const { type, id } = fromGlobalId(globalId);
    const repository = context.connection.getRepository(type);
    return repository.findOneById(id) as Promise<T>;
}

export const safeIdFetcher = async <T>(globalId: string, context: InterviewrResolverContext): Promise<T> => {
    const instance = await idFetcher<T>(globalId, context);

    if (!instance) {
        throw 'Unknown globalId';
    }

    return instance;
}

export const { nodeInterface, nodeField } = nodeDefinitions<InterviewrResolverContext>(
    idFetcher, 
    (value: object) => {
        return value.constructor.name;
    }
);