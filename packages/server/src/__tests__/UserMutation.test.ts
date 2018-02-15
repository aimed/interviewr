// tslint:disable-next-line:no-var-requires
require('dotenv').config();

import { Connection, createConnection } from 'typeorm';
import { Request as ERequest, Response as EResponse } from 'express';
import { InterviewrResolverContext, contextBuilder } from '../graphql/context';
import { instance, mock, when } from 'ts-mockito';

import { AuthService } from '../services/AuthService';
import { Container } from 'typedi';
import { User } from '../entities/User';
import { UserCreateMutationInput } from '../graphql/mutations/UserCreateMutation';
import { createContextWithoutUser } from './__mockery';
import { graphql } from 'graphql';
import { schema } from '../graphql/schema';

function connect() {
    return createConnection({
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: [
            'build/entities/**/*.js'
        ]
    });
}

let connection: Connection;

beforeAll(async () => {
    connection = await connect();
});

describe('User mutation', () => {
    it('should create', async () => {
        const context: InterviewrResolverContext = await createContextWithoutUser(connection);
        const input: UserCreateMutationInput = {
            email: 'test@example.com',
            password: '123123'
        };
        const result = await graphql(schema, `
            mutation UserCreate($input: UserCreateInput!) {
                UserCreate(input: $input) {
                    token
                    user { id }
                }
            }
        `, null, context, { input });

        if (result.errors) {
            throw result.errors[0];
        }

        expect(true).toBeTruthy();
    });
});
