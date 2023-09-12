import { Pauta } from "src/pautas/pauta.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Associate } from "./associate/associate.entity";

@Entity()
export class Voto {
    @PrimaryGeneratedColumn()
    id?: string;
    
    @ManyToOne( () => Pauta )
    @JoinColumn({ name: 'id_pauta' })
    pauta: Pauta;

    @ManyToOne( () => Associate )
    @JoinColumn({ name: 'id_associate' })
    associate: Associate;

    @Column({ name: 'voto' })
    optionVoto: OptionVoto;
}

export enum OptionVoto {
    YES = 'YES',
    NO = 'NO'
}