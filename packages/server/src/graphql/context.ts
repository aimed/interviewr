import { Connection } from "typeorm";
import { Request } from "express";

export interface InterviewrResolverContext {
    connection: Connection,
    req: Request
}

export const contextBuilder = (connection: Connection) => (
    (req: Request): InterviewrResolverContext => {
        return { 
            connection,
            req
        };
    }
);
