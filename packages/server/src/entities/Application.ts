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

    @ManyToOne(() => Personal, personal => personal.applications)
    public personal: Promise<Personal>;

    @ManyToMany(() => Skill, skill => skill.applications)
    public skills: Promise<Skill[]>;

    @ManyToMany(() => Work, work => work.applications)
    public work: Promise<Work[]>;

    @ManyToOne(() => User, user => user.applications)
    public user: Promise<User>;

    @ManyToMany(() => Education, education => education.applications)
    public education: Promise<Education[]>;

    @GraphQLScalarField()
    @Column()
    public text: string;

    @GraphQLScalarField()
    @Column({ default: true })
    public draft: boolean;
}
