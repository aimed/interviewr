// import { GraphQLNonNull, GraphQLString } from 'graphql';
// import { GraphQLOutputField, GraphQLScalarField } from '../graphql/GraphQLFieldDecorator';
// import { GraphlQLReflector, graphQLReflector } from '../graphql/GraphQLReflector';

// describe('decorators', () => {
//     const Create = Symbol('create');
//     const Type = Symbol('type');

//     class Test {
//         @GraphQLScalarField()
//         public stringField: string = '';

//         @GraphQLScalarField()
//         public intField: number = 0;

//         @GraphQLScalarField()
//         public boolField: boolean = false;

//         @GraphQLScalarField({ nonNull: true })
//         public stringNotNull: string = '';

//         @GraphQLScalarField({ type: GraphQLString })
//         public dateField: Date = new Date();

//         @GraphQLScalarField({ type: new GraphQLNonNull(GraphQLString) })
//         public notNullDateField: Date = new Date();
//     }

//     it('should handle scalar fields', () => {
//         const fields = graphQLReflector.getOutputFields(Test);
//         expect(fields).toHaveProperty('stringField');
//         expect(fields).toHaveProperty('intField');
//     });
// });
