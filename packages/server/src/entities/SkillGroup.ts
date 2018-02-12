import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLOutputField, GraphQLPrimaryIdField, GraphQLScalarField } from '../graphql/GraphQLFieldDecorator';

import { Skill } from './Skill';
import { User } from './User';
import { graphQlIDField } from '../graphql/utils';

/**
 * A SkillGroup defines a group a set of skills belong to.
 * Examples are languages, computer, etc.
 */
@Entity()
export class SkillGroup {
    @GraphQLPrimaryIdField()
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => Skill, skill => skill.group)
    public skills: Promise<Skill[]>;

    @ManyToOne(() => User, user => user.skillGroups)
    public user: Promise<User>;

    @GraphQLScalarField({nonNull: true})
    @Column()
    public title: string;
}
