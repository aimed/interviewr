import 'reflect-metadata';

import { ConnectionOptions, createConnection } from 'typeorm';
import { GraphQLServer, Options } from 'graphql-yoga';

import { contextBuilder } from './graphql/context';
import { schemaFactory } from './graphql/schema';

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

async function bootstrap() {
    try {
        const connection = await createConnection(options);
        const schema = await schemaFactory();
        const server = new GraphQLServer({
            schema,
            context: (req, res) => contextBuilder(connection, req, res)
        });
        const serverOptions: Options = { port: PORT, endpoint: '/graphql', playground: '/playground' };

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
