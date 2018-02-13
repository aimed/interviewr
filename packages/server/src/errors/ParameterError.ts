import { SerializableError } from './SerializableError';

export class ParameterError extends SerializableError {
    constructor(reason: string) {
        super(ParameterError, reason);
    }
}
