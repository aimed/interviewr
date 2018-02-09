import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Education } from './Education';
import { Skill } from './Skill';
import { User } from './User';
import { Work } from './Work';

@Entity()
export class Personal {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User)
    public user: Promise<User>;

    @Column({ nullable: true })
    public nationality: string;

    @Column({ nullable: true })
    public martialStatus: string;

    // This is free text, because users should have the option to specifiy 
    // their age as well.
    @Column({ nullable: true })
    public numberOfChildren: string;

    @Column({ nullable: true })
    public phone: string;

    @Column({ nullable: true })
    public birthDate: Date;

    @Column({ nullable: true })
    public birthPlace: string;
    
    @Column({ nullable: true })
    public firstName: string;
    
    @Column({ nullable: true })
    public lastName: string;
    
    // Use a simplified address scheme, because there is no reason to validate 
    // the data, nor a need to localize it in the forseeable future.
    @Column({ nullable: true })
    public addressLine1: string;
    
    @Column({ nullable: true })
    public addressLine2: string;
    
    @Column({ nullable: true })
    public addressLine3: string;
    
    @Column({ nullable: true })
    public addressLine4: string;
}


