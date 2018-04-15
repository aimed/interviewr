import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { GraphQLNonNull, GraphQLString } from 'graphql';

import { Application } from './Application';
import { User } from './User';
import { graphQlIDField } from '../graphql/utils';

@ObjectType()
@Entity()
export class Education {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(type => User)
    @ManyToOne(() => User)
    public user: Promise<User>;

    @Field(type => [Application])
    @ManyToMany(() => Application, application => application.education)
    public applications: Application[];

    @Field()
    @Column()
    public institution: string;

    @Field()
    @Column()
    public description: string;

    @Field()
    @Column()
    public degree: string;

    @Field(type => String)
    @Column()
    public startDate: Date;

    @Field(type => String, { nullable: true })
    @Column({ nullable: true })
    public endDate: Date;
}
