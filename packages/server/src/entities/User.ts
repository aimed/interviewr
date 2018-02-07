import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Education } from './Education';
import { Personal } from './Personal';
import { Skill } from './Skill';
import { Work } from './Work';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => Personal)
    public personalData: Promise<Personal>;

    @OneToMany(() => Skill, skill => skill.user)
    public skills: Skill[];

    @OneToMany(() => Education, education => education.user)
    public education: Education[];

    @OneToMany(() => Work, work => work.user)
    public work: Work[];
    
    @Column({ length: 256, unique: true }) // Maximum length of an email
    public email: string;
    
    @Column()
    public password: string;
}
