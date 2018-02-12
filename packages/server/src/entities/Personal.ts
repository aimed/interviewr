import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLOutputField, GraphQLPrimaryIdField, GraphQLScalarField } from '../graphql/GraphQLFieldDecorator';

import { Education } from './Education';
import { Skill } from './Skill';
import { User } from './User';
import { Work } from './Work';
import { graphQlIDField } from '../graphql/utils';

@Entity()
export class Personal {
    @GraphQLPrimaryIdField()
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User)
    public user: Promise<User>;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public nationality: string;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public martialStatus: string;

    // This is free text, because users should have the option to specifiy
    // their age as well.
    @GraphQLScalarField()
    @Column({ nullable: true })
    public numberOfChildren: string;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public phone: string;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public birthDate: Date;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public birthPlace: string;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public firstName: string;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public lastName: string;

    // Use a simplified address scheme, because there is no reason to validate
    // the data, nor a need to localize it in the forseeable future.
    @GraphQLScalarField()
    @Column({ nullable: true })
    public addressLine1: string;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public addressLine2: string;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public addressLine3: string;

    @GraphQLScalarField()
    @Column({ nullable: true })
    public addressLine4: string;
}
