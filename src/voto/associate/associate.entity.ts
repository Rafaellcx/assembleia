import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Associate {

    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    cpf: string;
}