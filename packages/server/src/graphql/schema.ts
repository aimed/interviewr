import {
    GraphQLSchema,
    graphql
} from 'graphql';

import { MutationType } from './MutationType';
import { RootQueryType } from './RootQueryType';

export const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});
