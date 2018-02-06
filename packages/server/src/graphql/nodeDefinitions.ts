import { fromGlobalId, nodeDefinitions } from "graphql-relay";

import { InterviewrResolverContext } from "./context";

export const { nodeInterface, nodeField } = nodeDefinitions<InterviewrResolverContext>((globalId, context, info) => {
    const { type, id } = fromGlobalId(globalId);
    const repository = context.connection.getRepository(type);
    return repository.findOneById(id);
});