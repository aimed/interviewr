import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Application } from './Application';
import { Education } from './Education';
import { GraphQLString } from 'graphql';
import { Skill } from './Skill';
import { User } from './User';
import { Work } from './Work';
import { graphQlIDField } from '../graphql/utils';

@ObjectType()
@Entity()
export class Personal {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(type => User)
    @ManyToOne(() => User)
    public user: Promise<User>;

    @Field(type => [Application])
    @OneToMany(() => Application, application => application.personal)
    public applications: Promise<Application[]>;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public nationality: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public martialStatus: string;

    // This is free text, because users should have the option to specifiy
    // their age as well.
    @Field({ nullable: true })
    @Column({ nullable: true })
    public numberOfChildren: string;

    @Field()
    @Column()
    public email: string;

    @Field()
    @Column()
    public phone: string;

    @Field(type => String, { nullable: true })
    @Column({ nullable: true })
    public birthDate: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public birthPlace: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public firstName: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public lastName: string;

    // Use a simplified address scheme, because there is no reason to validate
    // the data, nor a need to localize it in the forseeable future.
    @Field({ nullable: true })
    @Column({ nullable: true })
    public addressLine1: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public addressLine2: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public addressLine3: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public addressLine4: string;
}
