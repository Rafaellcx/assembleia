import { DataSource, Repository } from "typeorm";
import { Pauta } from "./pauta.entity"; 
import { Provider } from "@nestjs/common";

const pautaRepository: Provider<Repository<Pauta>> = {
    provide: 'PAUTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
        // const repository: Repository<Pauta> = dataSource.getRepository(Pauta);
        // return repository;
        return dataSource.getRepository(Pauta);
    },
    inject: ['DATA_SOURCE_MYSQL']
}

export const pautaProviders: Provider[] = [pautaRepository];