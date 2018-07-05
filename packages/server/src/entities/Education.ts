import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Education {
    @Field(type => ID)
    public id: number;

    @Field()
    public institution: string;

    @Field()
    public description: string;

    @Field()
    public degree: string;

    @Field(type => String)
    public startDate: Date;

    @Field(type => String, { nullable: true })
    public endDate: Date;
}
