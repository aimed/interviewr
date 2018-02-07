import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Education {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User)
    public user: Promise<User>;
    
    @Column()
    public institution: string;

    @Column()
    public description: string;

    @Column()
    public degree: string;

    @Column()
    public startDate: Date;

    @Column()
    public endDate: Date;
}
