import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Skill {
    @Field(() => ID)
    public id: number;

    @Field()
    public description: string;
}
