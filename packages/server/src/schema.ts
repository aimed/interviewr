import { buildSchema, useContainer } from 'type-graphql';

import { ApplicationResolver } from './resolvers/ApplicationResolver';
import { ContainerInstance } from 'typedi';

/**
 * Returns a schema and configures the given IOC container.
 * @param container The IOC container to configure
 */
export const schemaFactory = (container: ContainerInstance) => {
    useContainer(container);

    return buildSchema({
        resolvers: [ApplicationResolver]
    });
};
