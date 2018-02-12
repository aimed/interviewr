import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLOutputField, GraphQLPrimaryIdField, GraphQLScalarField } from '../graphql/GraphQLFieldDecorator';

import { User } from './User';
import { graphQlIDField } from '../graphql/utils';

@Entity()
export class Education {
    @GraphQLPrimaryIdField()
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User)
    public user: Promise<User>;

    @GraphQLScalarField({ nonNull: true })
    @Column()
    public institution: string;

    @GraphQLScalarField({ nonNull: true })
    @Column()
    public description: string;

    @GraphQLScalarField({ nonNull: true })
    @Column()
    public degree: string;

    @GraphQLScalarField({ type: new GraphQLNonNull(GraphQLString) })
    @Column()
    public startDate: Date;

    @GraphQLScalarField({ type: GraphQLString })
    @Column({ nullable: true })
    public endDate: Date;
}
