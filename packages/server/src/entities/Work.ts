import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Work {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User)
    public user: Promise<User>;
    
    @Column()
    public startDate: Date;

    @Column()
    public endDate: Date;

    @Column()
    public description: string;

    @Column()
    public employer: string;
}
