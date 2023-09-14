import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './pauta.entity';
import { Result } from 'src/common/result';

@Injectable()
export class PautasService {

    static DEFAULT_TIME_PAUTA: number = 10;

    constructor(
        @Inject('PAUTA_REPOSITORY')
        private readonly pautaRepository: Repository<Pauta>
    ) { }
    
    async save(pauta: Pauta) : Promise<Result<Pauta, Error>> {
        const possible_data = await this.pautaRepository.findOne({
            where: {
                description: pauta.description
            }
        })

        if (possible_data) {
            return new Result(null, new Error("pauta existente"));
        }
        
        pauta = await this.pautaRepository.save(pauta)
        
        return new Result(pauta, null);
    }

    async findAll(): Promise<Pauta[]> {
        return await this.pautaRepository.find();
    }

    async startSession(pauta: Pauta, minutes: number = PautasService.DEFAULT_TIME_PAUTA) : Promise<boolean> {

        if (!pauta.isPossibleInitializeSession()) {
            return false;
        }

        pauta.opening_date = new Date();
        pauta.closing_date = new Date(pauta.opening_date.getTime() + (minutes * 60000));
        
        await this.pautaRepository.update(pauta.id, pauta);

        return true;
    }

    async findById(id: string) : Promise<Pauta> {
        return this.pautaRepository.findOneBy({
            id: id
        });
    }
}
