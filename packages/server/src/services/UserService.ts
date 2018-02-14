import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Connection } from 'typeorm';
import { InvalidTokenError } from '../errors/InvalidTokenError';
import { Service } from 'typedi';
import { User } from '../entities/User';

export type UserTokenPayload = string;

@Service()
export class UserService {
    constructor(private connection: Connection) {
    }

    public async createUser(email: string, clearTextPassword: string): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const password = await bcrypt.hash(clearTextPassword, 10);
        const user = await userRepo.create({ email, password });
        await userRepo.save(user);
        return user;
    }

    public async createUserToken(email: string, clearTextPassword: string): Promise<{user: User, token: string}> {
        const userRepo = this.connection.getRepository(User);
        const user = await userRepo.findOne({ email });

        if (!user) {
            throw new Error(`No user with email ${email} exists.`);
        }

        const isPasswordCorrect = await bcrypt.compare(clearTextPassword, user.password);

        if (!isPasswordCorrect) {
            throw new Error('Incorrect password.');
        }

        const payload: UserTokenPayload = user.id + '';
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return { user, token };
    }

    public async verifyUserToken(token: string): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const payload = jwt.verify(token, process.env.JWT_SECRET) as UserTokenPayload;
        const user = await userRepo.findOneById(payload);

        if (!user) {
            throw new InvalidTokenError('User does not seem to exist anymore.');
        }

        return user;
    }
}
