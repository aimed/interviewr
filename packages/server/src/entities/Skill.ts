import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SkillGroup } from './SkillGroup';
import { User } from './User';

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User)
    public user: Promise<User>;
    
    @ManyToMany(() => SkillGroup, group => group.skills)
    public group: Promise<SkillGroup>;
    
    @Column()
    public description: string;
}