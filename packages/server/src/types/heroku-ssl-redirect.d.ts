declare module 'heroku-ssl-redirect' {
    import { RequestHandler } from 'express-serve-static-core';
    const factory: () => RequestHandler;
    export = factory;
}
