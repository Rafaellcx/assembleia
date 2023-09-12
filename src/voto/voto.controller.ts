import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { PautasService } from 'src/pautas/pautas.service';
import { VotoService } from './voto.service';
import { Response } from 'express';
import { RegisterVotoResource } from './voto.resource';

@Controller('pautas/:id/votos')
export class VotoController {
    constructor(
        private readonly pautasService: PautasService,
        private readonly votoService: VotoService
    ) { }
    
    @Post()
    async registerVoto(@Param('id') idPauta: string,@Body() resource: RegisterVotoResource,@Res() response: Response) {
        return response.status(HttpStatus.ACCEPTED).send();
    }
}
