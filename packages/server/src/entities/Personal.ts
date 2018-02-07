import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Education } from './Education';
import { Skill } from './Skill';
import { User } from './User';
import { Work } from './Work';

@Entity()
export class Personal {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => User)
    public user: Promise<User>;

    @Column()
    public nationality: string;

    @Column()
    public martialStatus: string;

    // This is free text, because users should have the option to specifiy 
    // their age as well.
    @Column()
    public numberOfChildren: string;

    @Column()
    public phone: string;

    @Column()
    public birthDate: Date;

    @Column()
    public birthPlace: string;
    
    @Column()
    public firstName: string;
    
    @Column()
    public lastName: string;
    
    // Use a simplified address scheme, because there is no reason to validate 
    // the data, nor a need to localize it in the forseeable future.
    @Column()
    public addressLine1: string;
    
    @Column()
    public addressLine2: string;
    
    @Column()
    public addressLine3: string;
    
    @Column()
    public addressLine4: string;
}


