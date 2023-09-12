import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Associate } from './associate.entity';

@Injectable()
export class AssociateService {
    constructor(
        @Inject('ASSOCIATE_REPOSITORY')
        private readonly associateRepository: Repository<Associate>
    ) { }
    
    async obtainByCpf(cpf: string): Promise<Associate> {
        return await this.associateRepository.findOne({
            where: {
                cpf: cpf
            }
        })
    }

    async recoveryOrCreate(cpf: string) : Promise<Associate> {
        const associate: Associate = await this.obtainByCpf(cpf);

        if (associate) {
            return associate;
        }

        const newAssociate = new Associate();
        newAssociate.cpf = cpf;
        await this.associateRepository.save(newAssociate);

        return newAssociate;
    }
}
