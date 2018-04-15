import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Skill } from './Skill';
import { User } from './User';
import { graphQlIDField } from '../graphql/utils';

/**
 * A SkillGroup defines a group a set of skills belong to.
 * Examples are languages, computer, etc.
 */
@ObjectType()
@Entity()
export class SkillGroup {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(type => [Skill])
    @OneToMany(() => Skill, skill => skill.group)
    public skills: Promise<Skill[]>;

    @Field(type => User)
    @ManyToOne(() => User, user => user.skillGroups)
    public user: Promise<User>;

    @Field()
    @Column()
    public title: string;
}
