import { Request, Response } from "express";

import { Connection } from "typeorm";
import { User } from "../entities/User";
import { UserService } from "./UserService";

export class AuthService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async authenticate(req: Request, res: Response): Promise<{req: Request, res: Response, user?: User}> {
        if (req.cookies && req.cookies.jwt) {
            const userService = new UserService(this.connection);
            const user = await userService.verifyUserToken(req.cookies.jwt);
            return Promise.resolve({ user, req, res });
        }
        return Promise.resolve({ req, res });
    }
}