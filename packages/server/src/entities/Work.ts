import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { GraphQLNonNull, GraphQLString } from 'graphql';

import { Application } from './Application';
import { User } from './User';

@ObjectType()
@Entity()
export class Work {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(type => User)
    @ManyToOne(() => User)
    public user: Promise<User>;

    @Field(type => [Application])
    @ManyToMany(() => Application, application => application.work)
    public applications: Application[];

    @Field(type => String)
    @Column()
    public startDate: Date;

    @Field(type => String, { nullable: true })
    @Column({ nullable: true })
    public endDate: Date;

    @Field(type => String)
    @Column()
    public description: string;

    @Field(type => String)
    @Column()
    public employer: string;

    @Field(type => String)
    @Column()
    public role: string;
}
