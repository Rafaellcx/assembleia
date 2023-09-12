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

    obtainStatus(): string {
        if (this.closing_date && this.closing_date < new Date()) {
            return StatusPauta.ENCERRADA;
        }

        if (this.opening_date) {
            return StatusPauta.INICIADA;
        }

        return StatusPauta.NAO_INICIADA;   
    }

    public isInitialized() : boolean {
        return this.isInStatus(StatusPauta.INICIADA);
    }

    public isFinished() : boolean {
        return this.isInStatus(StatusPauta.ENCERRADA);
    }

    public isPossibleInitializeSession(): boolean {
        return this.isInStatus(StatusPauta.NAO_INICIADA);
    }

    public isInStatus(statusVerificar: StatusPauta): boolean {
        const status = this.obtainStatus();
        return status == statusVerificar;
    }
}

enum StatusPauta {
    NAO_INICIADA = 'Sessão não iniciada',
    INICIADA = 'Sessão iniciada',
    ENCERRADA = 'Pauta Encerrada'
}