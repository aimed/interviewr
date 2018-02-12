import { GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphlQLReflector, graphQLReflector } from './GraphQLReflector';

import { GraphQLOutputField } from './GraphQLFieldDecorator';

describe('decorators', () => {
    const Create = Symbol('create');
    const Type = Symbol('type');

    class Test {
        @GraphQLOutputField()
        public stringField: string = '';

        @GraphQLOutputField()
        public intField: number = 0;

        @GraphQLOutputField()
        public boolField: boolean = false;

        @GraphQLOutputField({ nonNull: true })
        public stringNotNull: string = '';

        @GraphQLOutputField({ type: GraphQLString })
        public dateField: Date = new Date();

        @GraphQLOutputField({ type: new GraphQLNonNull(GraphQLString) })
        public nullDateField: Date = new Date();
    }

    it('should fields', () => {
        // tslint:disable-next-line:no-console
        console.log(graphQLReflector.getOutputFields(Test, Create));
    });
});
