import { GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLInputFieldConfig, GraphQLInputFieldConfigMap, GraphQLOutputType, GraphQLType } from 'graphql';

import { DefaultScope } from './GraphQLFieldDecorator';

interface ITypeStoreOutShape { [index: string]: GraphQLFieldConfigMap<any, any>; }
interface IStoreOutShape { [index: string]: ITypeStoreOutShape; }

interface ITypeStoreInShape { [index: string]: GraphQLInputFieldConfigMap; }
interface IStoreInShape { [index: string]: ITypeStoreInShape; }

// TODO: Add thunks.
export class GraphlQLReflector {
    private outputFields: IStoreOutShape = {
    };

    private inputFields: IStoreInShape = {
    };

    // tslint:disable-next-line:max-line-length
    public registerOutputField(target: object, key: string | symbol, scopes: symbol[], config: GraphQLFieldConfig<any, any>): void {
        const name = target.constructor.name;
        const targetStore = this.outputFields[name] || {};
        scopes.forEach(scope => {
            const scopeStore = targetStore[scope] || {};
            scopeStore[key] = config;
            targetStore[scope] = scopeStore;
        });
        this.outputFields[name] = targetStore;
    }

    public getOutputFields(target: new(...args: any[]) => {}, scope: string | symbol = DefaultScope) {
        const name = target.name;
        const targetStore = this.outputFields[name] || {};
        const scopeStore = {...(targetStore[scope] || {}), ...(targetStore[DefaultScope])};
        return scopeStore;
    }

    // tslint:disable-next-line:max-line-length
    public registerInputField(target: object, key: string | symbol, scopes: symbol[], config: GraphQLInputFieldConfig): void {
        const name = target.constructor.name;
        const targetStore = this.inputFields[name] || {};
        scopes.forEach(scope => {
            const scopeStore = targetStore[scope] || {};
            scopeStore[key] = config;
            targetStore[scope] = scopeStore;
        });
        this.inputFields[name] = targetStore;
    }

    public getInputFields(target: new(...args: any[]) => {}, scope: string | symbol = DefaultScope) {
        const name = target.name;
        const targetStore = this.inputFields[name] || {};
        const scopeStore = {...(targetStore[scope] || {}), ...(targetStore[DefaultScope])};
        return scopeStore;
    }
}

export const graphQLReflector = new GraphlQLReflector();
