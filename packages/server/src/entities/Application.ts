import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLPrimaryIdField, GraphQLScalarField } from '../graphql/GraphQLFieldDecorator';

import { Education } from './Education';
import { Personal } from './Personal';
import { Skill } from './Skill';
import { User } from './User';
import { Work } from './Work';

@Entity()
export class Application {
    @GraphQLPrimaryIdField()
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Personal)
    public personal: Promise<Personal>;

    @ManyToMany(() => Skill)
    public skills: Promise<Skill[]>;

    @ManyToMany(() => Work)
    public work: Promise<Work[]>;

    @ManyToOne(() => User)
    public user: Promise<User>;

    @ManyToMany(() => Education)
    public education: Promise<Education[]>;

    @GraphQLScalarField()
    @Column()
    public text: string;

    @GraphQLScalarField()
    @Column()
    public draft: boolean;
}
