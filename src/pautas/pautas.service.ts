import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './pauta.entity';
import { Result } from 'src/common/result';

@Injectable()
export class PautasService {

    constructor(
        @Inject('PAUTA_REPOSITORY')
        private readonly pautaRepository: Repository<Pauta>
    ) { }
    
    async save(pauta: Pauta) : Promise<Result<Pauta>> {
        const possible_data = await this.pautaRepository.findOne({
            where: {
                description: pauta.description
            }
        })

        if (possible_data) {
            return new Result(null, new Error("pauta existente"))
        }
        
        pauta = await this.pautaRepository.save(pauta)
        
        return new Result(pauta, null);
    }
}
