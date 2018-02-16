import { Container, ContainerInstance, Token } from 'typedi';
import { Request, Response } from 'express';

import { AuthService } from '../services/AuthService';
import { Connection } from 'typeorm';
import { User } from '../entities/User';

export const RequestService = new Token<Request>();
export const ResponseService = new Token<Response>();

export interface InterviewrResolverContext {
    connection: Connection;
    req: Request;
    res: Response;
    container: ContainerInstance;
}

// tslint:disable-next-line:max-line-length
export const contextBuilder = async (connection: Connection, req: Request, res: Response, container: ContainerInstance = Container.of(req)): Promise<InterviewrResolverContext> => {
    container.set(RequestService, req);
    container.set(ResponseService, res);
    container.set(Connection, connection);

    return {
        connection,
        req,
        res,
        container
    };
};
