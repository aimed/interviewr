import 'reflect-metadata';

import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as graphQLHTTP from 'express-graphql';
import * as path from 'path';

import { ConnectionOptions } from 'typeorm';
import { contextBuilder } from './graphql/context';
import { createConnection } from 'typeorm';
import { schema } from './graphql/schema';

const PORT = process.env.PORT || 8000;
// TODO: Generate initial migration once it is availiable in the next typeorm version. See https://github.com/typeorm/typeorm/issues/1305
// Configure connection in .env http://typeorm.io/#/using-ormconfig/loading-from-ormconfigenv-or-from-environment-variables
// const options: ConnectionOptions = require(path.resolve(__dirname, '..', 'ormconfig.json'));
const options: ConnectionOptions = {
    type: 'mysql',
    database: 'interviewr',
    username: 'root',
    password: '',
    migrations: [
        'src/migrations/**/*.ts'
    ],
    entities: [
        'src/entities/**/*.ts'
    ]
};

createConnection(options).then(async connection => {
    const app = express();
    const clientDir = path.resolve(__dirname, '../../client/build');

    // Serve static files
    app.use(express.static(clientDir));

    app.use(cookieParser());
    app.use(
        '/graphql',
        (req, res) => graphQLHTTP(
            async (gqlRequest) => ({
                schema,
                context: await contextBuilder(connection, req, res),
                graphiql: true
            })
        )(req, res)
    );

    // Serve client
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(path.dirname(clientDir), 'index.html'));
    });

    app.listen(PORT, (err: Error) => {
        if (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
        } else {
            // tslint:disable-next-line:no-console
            console.log('Started!');
        }
    });
// tslint:disable-next-line:no-console
}).catch((error) => console.error(error));
