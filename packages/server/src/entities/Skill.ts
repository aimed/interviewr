import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLOutputField, GraphQLPrimaryIdField, GraphQLScalarField } from '../graphql/GraphQLFieldDecorator';

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
    public group: Promise<SkillGroup>;

    @GraphQLScalarField({nonNull: true})
    @Column()
    public description: string;
}
