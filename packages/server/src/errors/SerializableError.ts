export class SerializableError extends Error {
    constructor(type: new (...params: any[]) => Error, reason: string, data: {} = {}) {
        super(SerializableError.createMessage(type, reason, data));
    }

    private static createMessage(type: new (...params: any[]) => Error, message: string, data: {}): string {
        const jsonData = {
            type: type.name,
            message,
            data
        };

        // TODO: Replace with formatError
        const jsonString = JSON.stringify(jsonData);
        const b64 = new Buffer(jsonString).toString('base64');
        return type.name + ': ' + message + ' ___' + b64 + '___';
    }
}
