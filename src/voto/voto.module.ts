import { Module } from '@nestjs/common';
import { VotoController } from './voto.controller';
import { DatabaseModule } from 'src/database/database.module';
import { votoProviders } from './voto.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...votoProviders],
  controllers: [VotoController]
})
export class VotoModule {}
