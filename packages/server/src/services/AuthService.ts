import { Request, Response } from "express";

import { Connection } from "typeorm";
import { User } from "../entities/User";
import { UserService } from "./UserService";

export class AuthService {
    private connection: Connection;
    private req: Request;
    private res: Response;
    private user?: User | null;

    constructor(connection: Connection, req: Request, res: Response) {
        this.connection = connection;
        this.req = req;
        this.res = res;
    }

    public setRequestUser(user: User) {
        this.user = user;
    }

    public async getRequestUser(): Promise<User | null> {
        if (this.user) {
            return this.user;
        }

        if (this.req.cookies && this.req.cookies.jwt) {
            const userService = new UserService(this.connection);
            const user = await userService.verifyUserToken(this.req.cookies.jwt);
            this.user = user;
            return user;
        }
        return null;
    }

    public async requireAuthenticated(): Promise<User> {
        const user = await this.getRequestUser();
        if (!user) {
            throw 'Not authenticated.';
        }

        return user;
    }
}