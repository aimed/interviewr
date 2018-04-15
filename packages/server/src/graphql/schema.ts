import { ApplicationResolver } from '../resolvers/ApplicationResolver';
import { buildSchema } from 'type-graphql';

export const schemaFactory = () => {
    return buildSchema({
        resolvers: [ApplicationResolver]
    });
};
