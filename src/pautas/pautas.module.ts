import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { pautaProviders } from './pauta.providers';

@Module({
    imports: [DatabaseModule],
    providers: []
})
export class PautasModule {}
