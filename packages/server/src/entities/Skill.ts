import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLOutputField, GraphQLPrimaryIdField, GraphQLScalarField } from '../graphql/GraphQLFieldDecorator';

import { Application } from './Application';
import { SkillGroup } from './SkillGroup';
import { User } from './User';
import { graphQlIDField } from '../graphql/utils';

@Entity()
export class Skill {
    @GraphQLPrimaryIdField()
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User)
    public user: Promise<User>;

    @ManyToMany(() => SkillGroup, group => group.skills)
    @JoinTable()
    public group: Promise<SkillGroup>;

    @ManyToMany(() => Application, application => application.skills)
    public applications: Application[];

    @GraphQLScalarField({nonNull: true})
    @Column()
    public description: string;
}
