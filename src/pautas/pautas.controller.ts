import { Body, Controller, Post, Res } from '@nestjs/common';
import { PautasService } from './pautas.service';
import { CriarPautaResource } from './pautas.resource';
import { Response } from 'express';

@Controller('pautas')
export class PautasController {

    constructor(
        private pautaService: PautasService
    ) { }
    
    @Post()
    save(@Body() pauta: CriarPautaResource, @Res() response: Response) {
        return response.status(201).send(pauta);
    }
}
