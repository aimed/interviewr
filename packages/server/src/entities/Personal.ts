import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Personal {
    @Field(type => ID)
    public id: number;

    @Field()
    public profileImageUrl: string;

    @Field({ nullable: true })
    public nationality: string;

    @Field({ nullable: true })
    public martialStatus: string;

    // This is free text, because users should have the option to specifiy
    // their age as well.
    @Field({ nullable: true })
    public numberOfChildren: string;

    @Field()
    public email: string;

    @Field()
    public phone: string;

    @Field(() => String, { nullable: true })
    public birthDate: Date;

    @Field({ nullable: true })
    public birthPlace: string;

    @Field({ nullable: true })
    public firstName: string;

    @Field({ nullable: true })
    public lastName: string;

    // Use a simplified address scheme, because there is no reason to validate
    // the data, nor a need to localize it in the forseeable future.
    @Field({ nullable: true })
    public addressLine1: string;

    @Field({ nullable: true })
    public addressLine2: string;

    @Field({ nullable: true })
    public addressLine3: string;

    @Field({ nullable: true })
    public addressLine4: string;
}
