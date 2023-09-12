import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OptionVoto, Voto } from './voto.entity';
import { AssociateService } from './associate/associate.service';
import { Pauta } from 'src/pautas/pauta.entity';
import { Result } from 'src/common/result';
import { Associate } from './associate/associate.entity';

@Injectable()
export class VotoService {
    constructor(
        @Inject('VOTO_REPOSITORY')
        private readonly votoRepository: Repository<Voto>,
        private readonly associateService: AssociateService
    ) { }
    
    async registerVoto(pauta: Pauta, cpf: string, optionVoto: OptionVoto) : Promise<Result<Voto>> {
        if (!pauta.isInitialized()) {
            return new Result(null, new Error("Pauta não está em sessão."));
        }
        
        const associate: Associate = await this.associateService.recoveryOrCreate(cpf);
        
        const thereIsAVoteFor: boolean = this.thereIsAVoteFor(pauta, associate);
        
        if (thereIsAVoteFor) {
            return new Result(null, new Error("Voto já registrado anteriormente."));
        }

        const voto = new Voto();
        voto.associate = associate;
        voto.pauta = pauta;
        voto.optionVoto = optionVoto;

        await this.votoRepository.save(voto);

        return new Result(voto, null);
    }
    
    async thereIsAVoteFor(pauta: Pauta, associate: Associate): Promise<boolean> {
        const voto: Voto = await this.votoRepository.findOne({
            where: {
                pauta: {
                    id: pauta.id
                },
                associate: {
                    id: associate.id
                }
            }
        })

        return !!voto;
    }
}
