import { Field, ID, ObjectType } from 'type-graphql';

/**
 * A SkillGroup defines a group a set of skills belong to.
 * Examples are languages, computer, etc.
 */
@ObjectType()
export class SkillGroup {
    @Field(type => ID)
    public id: number;

    @Field()
    public title: string;
}
