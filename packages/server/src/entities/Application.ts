import { Field, ID, ObjectType } from 'type-graphql';

import { Education } from './Education';
import { Personal } from './Personal';
import { SkillGroup } from './SkillGroup';
import { Work } from './Work';

@ObjectType()
export class Application {
    @Field(type => ID)
    public id: number;

    @Field(type => Personal)
    public personal: Promise<Personal>;

    @Field(type => [SkillGroup])
    public skillGroups: Promise<SkillGroup[]>;

    @Field(type => [Work])
    public work: Promise<Work[]>;

    @Field(type => [Education])
    public education: Promise<Education[]>;

    @Field()
    public color: string;

    @Field({ description: 'Translations for keys, such as "Birthdate", "Work Experience", etc. as a JSON string' })
    public i18n: string;

    @Field()
    public locale: string;
}
