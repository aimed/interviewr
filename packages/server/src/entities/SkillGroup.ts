import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Skill } from './Skill';
import { User } from './User';

/**
 * A SkillGroup defines a group a set of skills belong to.
 * Examples are languages, computer, etc.
 */
@Entity()
export class SkillGroup {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => Skill, skill => skill.group)
    public skills: Promise<Skill[]>;
    
    @ManyToOne(() => User, user => user.skillGroups)
    public user: Promise<User>;

    @Column()
    public title: string;
}