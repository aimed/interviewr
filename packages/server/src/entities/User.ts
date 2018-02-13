import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLInputField, GraphQLOutputField, GraphQLPrimaryIdField, GraphQLScalarField } from '../graphql/GraphQLFieldDecorator';

import { Education } from './Education';
import { Personal } from './Personal';
import { Skill } from './Skill';
import { SkillGroup } from './SkillGroup';
import { Work } from './Work';
import { graphQlIDField } from '../graphql/utils';

export const UserCreateScope = Symbol();
export const UserTypeScope = Symbol();

@Entity()
export class User {
    @GraphQLPrimaryIdField(UserTypeScope)
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => Personal, personal => personal.user)
    public personalData: Promise<Personal[]>;

    @OneToMany(() => Skill, skill => skill.user)
    public skills: Promise<Skill[]>;

    @OneToMany(() => SkillGroup, skillGroup => skillGroup.user)
    public skillGroups: Promise<SkillGroup[]>;

    @OneToMany(() => Education, education => education.user)
    public education: Promise<Education[]>;

    @OneToMany(() => Work, work => work.user)
    public work: Promise<Work[]>;

    @GraphQLScalarField({ nonNull: true })
    @Column({ length: 256, unique: true }) // Maximum length of an email
    public email: string;

    @GraphQLInputField({ nonNull: true, scopes: [UserCreateScope] })
    @Column()
    public password: string;
}
