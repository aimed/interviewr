import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Application } from './Application';
import { SkillGroup } from './SkillGroup';
import { User } from './User';
import { graphQlIDField } from '../graphql/utils';

@ObjectType()
@Entity()
export class Skill {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(type => User)
    @ManyToOne(() => User)
    public user: Promise<User>;

    @Field(type => SkillGroup)
    @ManyToMany(() => SkillGroup, group => group.skills)
    @JoinTable()
    public group: Promise<SkillGroup>;

    @ManyToMany(() => Application, application => application.skills)
    public applications: Application[];

    @Field()
    @Column()
    public description: string;
}
