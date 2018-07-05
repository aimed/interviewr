import 'reflect-metadata';

import * as express from 'express';
import * as path from 'path';
import * as sslRedirect from 'heroku-ssl-redirect';

import { GraphQLServer, Options } from 'graphql-yoga';
import { Request, Response } from 'express-serve-static-core';

import { ContainerInstance } from 'typedi';
import { schemaFactory } from './schema';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
    try {
        const clientDir = path.resolve(__dirname, '../../client/build/');
        const container = new ContainerInstance('');
        const schema = await schemaFactory(container);
        const serverOptions: Options = { port: PORT, endpoint: '/graphql', playground: '/playground' };
        const server = new GraphQLServer({ schema });

        // Redirect to https if in production.
        server.use(sslRedirect());

        // Serve robots.txt.
        server.get('/robots.txt', (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '..', 'static', 'robots.txt'));
            res.end();
        });

        // Serve client.
        server.use(express.static(clientDir));

        server.get('/', (req: Request, res: Response) => {
            res.sendFile(path.resolve(clientDir, 'index.html'));
        });

        server.get('/application/*', (req: Request, res: Response) => {
            res.sendFile(path.resolve(clientDir, 'index.html'));
        });

        server.start(serverOptions, (info) => {
            // tslint:disable-next-line:no-console
            console.info(
                // tslint:disable-next-line:max-line-length
                `Server running on ${info.port}, playground availiable at http://localhost:${info.port}${info.playground}`
            );
        });
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.error(error);
    }
}

bootstrap();
