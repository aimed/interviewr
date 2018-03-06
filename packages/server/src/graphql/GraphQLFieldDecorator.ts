import 'reflect-metadata';

import { GraphQLBoolean, GraphQLFieldConfig, GraphQLID, GraphQLInputFieldConfig, GraphQLInputType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLOutputType, GraphQLScalarType, GraphQLString } from 'graphql';

import { graphQLReflector } from './GraphQLReflector';
import { toGlobalId } from 'graphql-relay';

/**
 * A scope that is assigned to all input and output fields by default.
 */
export const DefaultScope = Symbol('Default');

/**
 * Maps type data emitted by reflect-metadata to GraphQL scalars.
 * Note: Date is resolved to GraphQLString by default.
 */
export const MetadataGraphQLTypeMap: { [index: string]: GraphQLScalarType } = {
    String: GraphQLString,
    Number: GraphQLInt,
    Boolean: GraphQLBoolean,
    Date: GraphQLString
};

/**
 * Returns a GraphQLType for the given decorated field using the supplied
 * fallback. If nonNull is checked, this will return the field as nonNull.
 * @param target Decorator.
 * @param key Decorator.
 * @param fallback The fallback type to use, if it cannot be deferred.
 * @param nonNull Whether or not the GraphQLType should be NonNull.
 */
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

/**
 * Defines a field.
 * When creating GraphQLObjects, a scope can be specified. Only fields with the given scope will be used.
 * If assigning a scope, the DefaultScope has to be passed manually.
 */
export interface GraphQLFieldDecoratorConfig { scopes?: symbol[]; nonNull?: boolean; }

/**
 * A scalar field is a field that will be used for both, input and output GraphQLObjects by default.
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

/**
 * Register an GraphQLField output for the given field.
 *
 * @export
 * @template TSource Resolver source.
 * @template TContext Resolver context.
 * @param {(Partial<GraphQLFieldConfig<TSource, TContext>> & GraphQLFieldDecoratorConfig)} [config={}] The config.
 * @param {GraphQLFieldDecoratorConfig} [options={}] Additional options.
 * @returns {PropertyDecorator} The decorator.
 */
// tslint:disable-next-line:max-line-length
export function GraphQLOutputField<TSource, TContext>(config: Partial<GraphQLFieldConfig<TSource, TContext>> & GraphQLFieldDecoratorConfig = {}, options: GraphQLFieldDecoratorConfig = {}): PropertyDecorator {
    return (target, key) => {
        const { scopes = [DefaultScope], nonNull = false, type = null, ...field } = { ...config, ...options };
        const typeWithNotNull = getTypeFromMetadata(target, key, type, nonNull);
        graphQLReflector.registerOutputField(target, key, scopes, { type: typeWithNotNull, ...field });
    };
}

/**
 * Register an GraphlQLField input for the given field.
 *
 * @export
 * @template TSource Resolver source.
 * @template TContext Resolver context.
 * @param {(Partial<GraphQLInputFieldConfig> & GraphQLFieldDecoratorConfig)} [config={}] The config.
 * @param {GraphQLFieldDecoratorConfig} [options={}] Additional options.
 * @returns {PropertyDecorator} The decorator.
 */
// tslint:disable-next-line:max-line-length
export function GraphQLInputField<TSource, TContext>(config: Partial<GraphQLInputFieldConfig> & GraphQLFieldDecoratorConfig = {}, options: GraphQLFieldDecoratorConfig = {}): PropertyDecorator {
    return (target, key) => {
        const { scopes = [DefaultScope], nonNull = false, type = null, ...field } = { ...config, ...options };
        const typeWithNotNull = getTypeFromMetadata(target, key, type, nonNull);
        graphQLReflector.registerInputField(target, key, scopes, { type: typeWithNotNull, ...field });
    };
}

/**
 * A special primary id field that automatically resolved to a globalId.
 * The field is only added to the output fields.
 *
 * @param scopes Optional scopes this field should be assigned to.
 */
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
