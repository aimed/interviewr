import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Application } from './Application';
import { Education } from './Education';
import { Personal } from './Personal';
import { Skill } from './Skill';
import { SkillGroup } from './SkillGroup';
import { Work } from './Work';
import { graphQlIDField } from '../graphql/utils';

export const UserCreateScope = Symbol();
export const UserTypeScope = Symbol();

@ObjectType()
@Entity()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(type => [Personal])
    @OneToMany(() => Personal, personal => personal.user)
    public personalData: Promise<Personal[]>;

    @Field(type => [Skill])
    @OneToMany(() => Skill, skill => skill.user)
    public skills: Promise<Skill[]>;

    @Field(type => [SkillGroup])
    @OneToMany(() => SkillGroup, skillGroup => skillGroup.user)
    public skillGroups: Promise<SkillGroup[]>;

    @Field(type => [Education])
    @OneToMany(() => Education, education => education.user)
    public education: Promise<Education[]>;

    @Field(type => [Work])
    @OneToMany(() => Work, work => work.user)
    public work: Promise<Work[]>;

    @Field(type => [Application])
    @OneToMany(() => Application, application => application.user)
    public applications: Promise<Application>;

    @Field()
    @Column({ length: 256, unique: true }) // Maximum length of an email
    public email: string;

    @Column()
    public password: string;
}
