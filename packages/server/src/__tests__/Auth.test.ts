// tslint:disable-next-line:no-var-requires
require('dotenv').config();

import { Request, Response } from 'express';
import { connect, createContextWithUser } from './__mockery';

import { AuthService } from '../services/AuthService';
import { Connection } from 'typeorm';
import { Container } from 'typedi';
import { UserService } from '../services/UserService';
import { contextBuilder } from '../graphql/context';
import { graphql } from 'graphql';
import { schema } from '../graphql/schema';

let connection: Connection;

beforeAll(async () => {
    connection = await connect();
});

describe('Auth', () => {
    it('should login', async () => {
        const input = { email: 'test@example.com', password: 'test123123' };
        const service = new UserService(connection);
        const user = await service.createUser(input.email, input.password);
        const container = Container.of({});

        const context = await contextBuilder(
            connection,
            {} as Request,
            { cookie(...params: any[]) { /**/} } as Response,
            container
        );

        const result = await graphql(schema, `
            {
                login(email: "${input.email}", password: "${input.password}") {
                    token
                    viewer {
                        user {
                            id
                            email
                        }
                    }
                }
            }
        `, null, context);

        if (result.errors) {
            throw result.errors[0];
        }
    });
});
