import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Associate } from './associate.entity';

@Injectable()
export class AssociateService {
    constructor(
        @Inject('ASSOCIATE_REPOSITORY')
        private readonly associateRepository: Repository<Associate>
    ){}
}
