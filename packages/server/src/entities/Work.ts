import { Field, ID, ObjectType } from 'type-graphql';

import { Application } from './Application';

@ObjectType()
export class Work {
    @Field(type => ID)
    public id: number;

    @Field(type => String)
    public startDate: Date;

    @Field(type => String, { nullable: true })
    public endDate: Date;

    @Field(type => String)
    public description: string;

    @Field(type => String)
    public employer: string;

    @Field(type => String)
    public role: string;
}
