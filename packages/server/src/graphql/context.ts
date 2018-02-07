import { Request, Response } from "express";

import { AuthService } from "../services/AuthService";
import { Connection } from "typeorm";
import { User } from "../entities/User";

export interface InterviewrResolverContext {
    connection: Connection;
    req: Request;
    res: Response;
    user?: User;
}

export const contextBuilder = async (connection: Connection, req: Request, res: Response): Promise<InterviewrResolverContext> => {
    const authService = new AuthService(connection);
    const { user } = await authService.authenticate(req, res);

    return {
        connection,
        req,
        res,
        user
    };
};
