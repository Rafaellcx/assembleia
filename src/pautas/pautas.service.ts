import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './pauta.entity';

@Injectable()
export class PautasService {

    constructor(
        @Inject('PAUTA_REPOSITORY')
        private readonly pautaRepository: Repository<Pauta>
    ) { }
    
    async save(pauta: Pauta) : Promise<Pauta> {
        const possible_data = await this.pautaRepository.findOne({
            where: {
                description: pauta.description
            }
        })

        if (possible_data) throw Error("pauta existente")
        
        pauta = await this.pautaRepository.save(pauta)
        
        return pauta
    }
}
