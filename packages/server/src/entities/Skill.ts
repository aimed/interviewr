import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Skill {
    @Field(type => ID)
    public id: number;

    @Field()
    public description: string;

    @Field({ nullable: true, description: 'A value between 1 and 5 indicating how well the skill is known' })
    public proficiency: number;
}
