import { buildSchema, useContainer } from 'type-graphql';

import { ApplicationResolver } from './resolvers/ApplicationResolver';
import { ContainerInstance } from 'typedi';

export const schemaFactory = (container: ContainerInstance) => {
    useContainer(container);

    return buildSchema({
        resolvers: [ApplicationResolver]
    });
};
