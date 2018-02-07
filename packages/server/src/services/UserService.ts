import *  as bcrypt from "bcrypt";

import { Connection } from "typeorm";
import { User } from "../entities/User";

export class UserService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    public async createUser(email: string, clearTextPassword: string): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const password = await bcrypt.hash(clearTextPassword, 10);
        const user = await userRepo.create({ email, password });
        return user;
    }
}