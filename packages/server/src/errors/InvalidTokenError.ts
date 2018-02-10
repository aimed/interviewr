import { SerializableError } from "./SerializableError";

export class InvalidTokenError extends SerializableError {
    constructor(reason: string) {
        super(InvalidTokenError, reason);
    }
}
