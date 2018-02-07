import { Request, Response } from "express";

import { Connection } from "typeorm";

export interface InterviewrResolverContext {
    connection: Connection;
    req: Request;
    res: Response;
}

export const contextBuilder = (connection: Connection) => (
    (req: Request, res: Response): InterviewrResolverContext => {
        return { 
            connection,
            req,
            res
        };
    }
);
