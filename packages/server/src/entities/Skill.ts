import { Field, ID, ObjectType } from 'type-graphql';

import { SkillGroup } from './SkillGroup';

@ObjectType()
export class Skill {
    @Field(() => ID)
    public id: number;

    @Field(() => SkillGroup)
    public group: Promise<SkillGroup>;

    @Field()
    public description: string;
}
