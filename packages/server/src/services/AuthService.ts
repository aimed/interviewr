import { Inject, Service } from 'typedi';
import { Request, Response } from 'express';

import { AuthorizationError } from '../errors/AuthorizationError';
import { Connection } from 'typeorm';
import { User } from '../entities/User';
import { UserService } from './UserService';

// import { RequestService, ResponseService } from '../graphql/context';

@Service()
export class AuthService {
    private user?: User | null;
    private req: Request;
    private res: Response;

    constructor(
        private connection: Connection,
        private userService: UserService,
        // @Inject(() => RequestService)
        req: Request,
        // @Inject(() => ResponseService)
        res: Response
    ) {
        this.res = res;
        this.req = req;
    }

    public clearRequestUser() {
        this.user = null;
        this.res.clearCookie('jwt');
    }

    public setRequestUser(user: User, token: string) {
        this.user = user;
        this.res.cookie('jwt', token);
    }

    public async getRequestUser(): Promise<User | null> {
        if (this.user !== undefined) {
            return this.user;
        }

        if (this.req.cookies && this.req.cookies.jwt) {
            try {
                const user = await this.userService.verifyUserToken(this.req.cookies.jwt);
                this.user = user;
                return user;
            } catch (e) {
                // TODO: Check specifically for auth errors.
                this.clearRequestUser();
                throw e;
            }
        }
        return null;
    }

    public async requireAuthenticated(): Promise<User> {
        const user = await this.getRequestUser();
        if (!user) {
            throw new AuthorizationError('Not authenticated');
        }

        return user;
    }

    public async permissionSelfOrAdmin(userOrUserPromise: User | Promise<User>) {
        const user = await userOrUserPromise;
        const requestUser = await this.getRequestUser();

        if (user.id !== requestUser.id) {
            throw new AuthorizationError('Not authorized');
        }
    }

    public async requireNotAuthenticated(): Promise<void> {
        const user = await this.getRequestUser();
        if (user) {
            throw new Error('Cannot create a user while logged in.');
        }
    }
}
