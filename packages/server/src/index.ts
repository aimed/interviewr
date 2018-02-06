import "reflect-metadata";

import * as express from 'express';
import * as graphQLHTTP from 'express-graphql';
import * as path from 'path';

import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import { contextBuilder } from "./graphql/context";
import { createConnection } from "typeorm";
import { schema } from "./graphql/schema";

// TODO: Generate initial migration once it is availiable in the next typeorm version. See https://github.com/typeorm/typeorm/issues/1305
// Configure connection in .env http://typeorm.io/#/using-ormconfig/loading-from-ormconfigenv-or-from-environment-variables
const options: ConnectionOptions = require(path.resolve(__dirname, '..', 'ormconfig.json'));

createConnection(options).then(async connection => {
    const app = express();
    
    app.use(
        '/graphql', 
        graphQLHTTP(
            (req) => ({ 
                schema: schema, 
                context: contextBuilder(connection)(req), 
                graphiql: true 
            })
        )
    );
    
    app.listen(8000, (err: Error) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Started!');
        }
    });
}).catch(error => console.error(error));
