import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pauta {

    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    description: string;
    
    @CreateDateColumn()
    registration_date?: Date;
    
    @Column({ type: 'timestamp', nullable: true })
    opening_date?: Date;
    
    @Column({ type: 'timestamp', nullable: true })
    closing_date?: Date;
}