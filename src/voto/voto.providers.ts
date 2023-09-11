import { Provider } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Voto } from "./voto.entity";
import { Associate } from "./associate/associate.entity";

const votoRepository: Provider<Repository<Voto>> = {
    provide: 'VOTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(Voto);
    },
    inject: ['DATA_SOURCE_MYSQL']
}

const associateRepository: Provider<Repository<Associate>> = {
    provide: 'ASSOCIATE_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(Associate);
    },
    inject: ['DATA_SOURCE_MYSQL']
}

export const votoProviders: Provider[] = [votoRepository, associateRepository];