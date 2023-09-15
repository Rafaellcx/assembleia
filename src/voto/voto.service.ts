import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OptionVoto, Voto } from './voto.entity';
import { AssociateService } from './associate/associate.service';
import { Pauta } from 'src/pautas/pauta.entity';
import { Result } from 'src/common/result';
import { Associate } from './associate/associate.entity';
import { HttpError } from 'src/common/httpError';
import { ResultVoteResource } from './result/result.resource';

@Injectable()
export class VotoService {
    constructor(
        @Inject('VOTO_REPOSITORY')
        private readonly votoRepository: Repository<Voto>,
        private readonly associateService: AssociateService
    ) { }
    
    async registerVoto(pauta: Pauta, cpf: string, optionVoto: OptionVoto): Promise<Result<Voto, HttpError>> {
        if (!pauta.isInitialized()) {
            return new Result(null, new HttpError("Pauta não está em sessão.", HttpStatus.UNPROCESSABLE_ENTITY));
        }
        
        const associate: Associate = await this.associateService.recoveryOrCreate(cpf);
        
        const thereIsAVoteFor: boolean = await this.thereIsAVoteFor(pauta, associate);
        
        if (thereIsAVoteFor) {
            return new Result(null, new HttpError("Voto já registrado anteriormente.", HttpStatus.CONFLICT));
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

    async getVotesByPauta(pauta: Pauta): Promise<Voto[]> {
        return await this.votoRepository.find({
            where: {
                pauta: {
                    id: pauta.id
                }
            }
        })
    }

    getWinner(yes: number, no: number) : OptionVoto {
        if (yes == no) {
            return null;
        }

        return yes > no ? OptionVoto.YES : OptionVoto.NO;
    }

    async getResult(pauta: Pauta) : Promise<Result<ResultVoteResource, HttpError>> {
        if (!pauta.isFinished) {
            return new Result(null, new HttpError("Resultado ainda não disponível.",HttpStatus.NOT_FOUND));
        }

        const votes: Voto[] = await this.getVotesByPauta(pauta);

        const quantityYes = votes.filter(vote => vote.optionVoto == OptionVoto.YES).length;
        const quantityNo = votes.filter(vote => vote.optionVoto == OptionVoto.NO).length;

        const winner = this.getWinner(quantityYes, quantityNo);

        const result = new ResultVoteResource();
        result.pauta = pauta.description;
        result.opening = pauta.opening_date;
        result.closing = pauta.closing_date;
        result.totalVote = votes.length;
        result.quantityYes = quantityYes;
        result.quantityNo = quantityNo;
        result.winningOption = winner;
        
        return new Result(result, null);
    }
}
