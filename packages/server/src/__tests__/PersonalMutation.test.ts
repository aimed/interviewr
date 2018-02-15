import { Connection, createConnection } from 'typeorm';
import { InterviewrResolverContext, contextBuilder } from '../graphql/context';
import { connect, createContextWithUser } from './__mockery';

import { PersonalCreateMutationInput } from '../graphql/mutations/PersonalCreateMutation';
import { graphql } from 'graphql';
import { schema } from '../graphql/schema';

let connection: Connection;

beforeAll(async () => {
    connection = await connect();
});

describe('Personal mutation', () => {
    it('should create', async () => {
        const context: InterviewrResolverContext = await createContextWithUser(connection);

        const input = {
            firstName: 'FirstName',
            lastName: 'LastName'
        };

        const result = await graphql(schema, `
            mutation PersonalCreate($input: PersonalCreateInput!) {
                PersonalCreate(input: $input) {
                    viewer {
                        user {
                            id
                            personal {
                                id
                                firstName
                                lastName
                            }
                        }
                    }
                }
            }
        `, null, context, { input });

        if (result.errors) {
            throw result.errors[0];
        }
    });
});
