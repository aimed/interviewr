import { SerializableError } from './SerializableError';

export class AuthorizationError extends SerializableError {
    constructor(reason: string) {
        super(AuthorizationError, reason);
    }
}
