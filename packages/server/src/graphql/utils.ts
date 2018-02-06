import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from "graphql";

import { toGlobalId } from 'graphql-relay';

export function graphlQLObjectName<T>(type: new () => T) {
    return type.name;
}

export function graphQlIDField<TSource, TContext, T>(type: new () => T, idGetter: (instance: TSource) => string | number): GraphQLFieldConfig<TSource, TContext> {
    const typeName = graphlQLObjectName(type);
        
    return {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (instance) => {
            return toGlobalId(typeName, idGetter(instance) + '')
        }
    };
}
