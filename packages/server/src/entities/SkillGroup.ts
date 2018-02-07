import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Skill } from './Skill';

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
    
    @Column()
    public title: string;
}