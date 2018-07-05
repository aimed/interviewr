import { Field, ID, ObjectType } from 'type-graphql';

import { Education } from './Education';
import { Personal } from './Personal';
import { Skill } from './Skill';
import { Work } from './Work';

@ObjectType()
export class Application {
    @Field(type => ID)
    public id: number;

    @Field(type => Personal)
    public personal: Promise<Personal>;

    @Field(type => [Skill])
    public skills: Promise<Skill[]>;

    @Field(type => [Work])
    public work: Promise<Work[]>;

    @Field(type => [Education])
    public education: Promise<Education[]>;

    @Field()
    public text: string;

    @Field()
    public draft: boolean;
}
