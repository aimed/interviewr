import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Education } from './Education';
import { Personal } from './Personal';
import { Skill } from './Skill';
import { User } from './User';
import { Work } from './Work';

@ObjectType()
@Entity()
export class Application {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(type => Personal)
    @ManyToOne(() => Personal, personal => personal.applications, { cascadeInsert: true })
    public personal: Promise<Personal>;

    @Field(type => [Skill])
    @ManyToMany(() => Skill, skill => skill.applications, { cascadeInsert: true })
    @JoinTable()
    public skills: Promise<Skill[]>;

    @Field(type => [Work])
    @ManyToMany(() => Work, work => work.applications, { cascadeInsert: true })
    @JoinTable()
    public work: Promise<Work[]>;

    @Field(type => User)
    @ManyToOne(() => User, user => user.applications)
    public user: Promise<User>;

    @Field(type => [Education])
    @ManyToMany(() => Education, education => education.applications, { cascadeInsert: true })
    @JoinTable()
    public education: Promise<Education[]>;

    @Field()
    @Column()
    public text: string;

    @Field()
    @Column({ default: true })
    public draft: boolean;
}
