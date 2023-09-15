import { Module } from '@nestjs/common';
import { VotoController } from './voto.controller';
import { DatabaseModule } from 'src/database/database.module';
import { votoProviders } from './voto.providers';
import { VotoService } from './voto.service';
import { AssociateService } from './associate/associate.service';
import { PautasModule } from 'src/pautas/pautas.module';
import { ResultController } from './result/result.controller';

@Module({
  imports: [DatabaseModule, PautasModule],
  providers: [...votoProviders, VotoService, AssociateService],
  controllers: [VotoController, ResultController]
})
export class VotoModule {}
