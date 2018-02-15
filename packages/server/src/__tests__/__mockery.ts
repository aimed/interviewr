import * as crypto from 'crypto';

import { Connection, createConnection } from 'typeorm';
import { InterviewrResolverContext, contextBuilder } from '../graphql/context';
import { instance, mock, when } from 'ts-mockito/lib/ts-mockito';

import { AuthService } from '../services/AuthService';
import { AuthorizationError } from '../errors/AuthorizationError';
import { Container } from 'typedi';
import { User } from '../entities/User';
import { toGlobalId } from 'graphql-relay';

export function connect() {
    const random = Math.random().toString();
    // tslint:disable-next-line:max-line-length
    const name = crypto.createHash('sha1').update(new Date().getMilliseconds().toString() + random).digest().toString('base64');
    return createConnection({
        name,
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: [
            'build/entities/**/*.js'
        ]
    });
}

export async function createContextWithoutUser(connection: Connection) {
    const authServiceMock = mock(AuthService);
    when(authServiceMock.getRequestUser()).thenReturn(Promise.resolve(null));
    when(authServiceMock.requireAuthenticated()).thenThrow(new AuthorizationError(''));
    const authServiceInstance = instance(authServiceMock);

    const container = Container.of({});
    container.set(AuthService, authServiceInstance);

    const context: InterviewrResolverContext = await contextBuilder(
        connection,
        {} as any,
        {} as any,
        container
    );

    return context;
}

async function createUser(connection: Connection) {
    const repo = connection.getRepository(User);
    const user = repo.create({ email: '', password: '' });
    await repo.save(user);
    return user;
}

// tslint:disable-next-line:max-line-length
export async function createContextWithUser(connection: Connection, user: Promise<User> = createUser(connection)): Promise<InterviewrResolverContext> {
    const container = Container.of({});
    container.set(Connection, connection);

    const authServiceMock = mock(AuthService);
    when(authServiceMock.getRequestUser()).thenReturn(user);
    when(authServiceMock.requireAuthenticated()).thenReturn(user);
    const authServiceInstance = instance(authServiceMock);

    container.set(AuthService, authServiceInstance);

    const context: InterviewrResolverContext = await contextBuilder(
        connection,
        {} as any,
        {} as any,
        container
    );
    return context;
}

export function getGlobalId(obj: { id: number }): string {
    return toGlobalId(obj.constructor.name, obj.id + '');
}
