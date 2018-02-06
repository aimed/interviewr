import {
    GraphQLSchema,
    graphql
} from 'graphql';

import { MutationType } from './mutations/MutationType';
import { RootQueryType } from './queries/RootQueryType';

export const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});
