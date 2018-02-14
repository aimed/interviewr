import 'reflect-metadata';

import { GraphQLBoolean, GraphQLFieldConfig, GraphQLID, GraphQLInputFieldConfig, GraphQLInputType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLOutputType, GraphQLScalarType, GraphQLString } from 'graphql';

import { graphQLReflector } from './GraphQLReflector';
import { toGlobalId } from 'graphql-relay';

export const DefaultScope = Symbol('Default');

export const MetadataGraphQLTypeMap: { [index: string]: GraphQLScalarType } = {
    String: GraphQLString,
    Number: GraphQLInt,
    Boolean: GraphQLBoolean,
    Date: GraphQLString
};

// tslint:disable-next-line:max-line-length
export const getTypeFromMetadata = <T extends GraphQLInputType | GraphQLOutputType>(target: object, key: string | symbol, fallback: T, nonNull: boolean) => {
    const metadata = Reflect.getMetadata('design:type', target, key);
    const type = fallback || MetadataGraphQLTypeMap[metadata.name || metadata.contructor.name];

    if (!type) {
        throw new Error(
            `Cannot convert ${metadata.name || metadata.contructor.name} on ${key} to an GraphlQLOutputType.`,
        );
    }
    const typeWithNotNull = nonNull && !(type instanceof GraphQLNonNull) ? new GraphQLNonNull(type) : type;
    return typeWithNotNull;
};

export interface GraphQLFieldDecoratorConfig { scopes?: symbol[]; nonNull?: boolean; }

/**
 *
 *
 * @export
 * @param {(GraphQLFieldDecoratorConfig & { type?: GraphQLScalarType | GraphQLNonNull<GraphQLScalarType> })} [config={}]
 * @returns {PropertyDecorator}
 */
export function GraphQLScalarField(
    config: GraphQLFieldDecoratorConfig & { type?: GraphQLScalarType | GraphQLNonNull<GraphQLScalarType> } = {})
: PropertyDecorator {
    return (target, key) => {
        const { scopes = [DefaultScope], nonNull = false, type } = config;
        const typeWithNotNull = getTypeFromMetadata(target, key, type, nonNull);
        graphQLReflector.registerOutputField(target, key, scopes, { type: typeWithNotNull });
        graphQLReflector.registerInputField(target, key, scopes, { type: typeWithNotNull });
    };
}

// tslint:disable-next-line:max-line-length
export function GraphQLOutputField<TSource, TContext>(config: Partial<GraphQLFieldConfig<TSource, TContext>> & GraphQLFieldDecoratorConfig = {}, options: GraphQLFieldDecoratorConfig = {}): PropertyDecorator {
    return (target, key) => {
        const { scopes = [DefaultScope], nonNull = false, type = null, ...field } = { ...config, ...options };
        const typeWithNotNull = getTypeFromMetadata(target, key, type, nonNull);
        graphQLReflector.registerOutputField(target, key, scopes, { type: typeWithNotNull, ...field });
    };
}

// tslint:disable-next-line:max-line-length
export function GraphQLInputField<TSource, TContext>(config: Partial<GraphQLInputFieldConfig> & GraphQLFieldDecoratorConfig = {}, options: GraphQLFieldDecoratorConfig = {}): PropertyDecorator {
    return (target, key) => {
        const { scopes = [DefaultScope], nonNull = false, type = null, ...field } = { ...config, ...options };
        const typeWithNotNull = getTypeFromMetadata(target, key, type, nonNull);
        graphQLReflector.registerInputField(target, key, scopes, { type: typeWithNotNull, ...field });
    };
}

export function GraphQLPrimaryIdField(...scopes: symbol[]): PropertyDecorator {
    return (target, key) => {
        const field: GraphQLFieldConfig<any, any> = {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (source) => {
                return toGlobalId(target.constructor.name, source[key]);
            }
        };
        graphQLReflector.registerOutputField(target, key, scopes.length === 0 ? [DefaultScope] : scopes, field);
    };
}

/*
export function GraphQLListField(typeGetter: () => GraphQLObjectType): PropertyDecorator {
    return (target, key) => {
        const a = 2 * 3;
    };
}
*/
