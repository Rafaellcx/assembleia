import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { PautasService } from 'src/pautas/pautas.service';
import { VotoService } from './voto.service';
import { Response } from 'express';
import { RegisterVotoResource } from './voto.resource';
import { Pauta } from 'src/pautas/pauta.entity';
import { ErrorResponse } from 'src/common/error.resource';

@Controller('pautas/:id/votos')
export class VotoController {
    constructor(
        private readonly pautasService: PautasService,
        private readonly votoService: VotoService
    ) { }
    
    @Post()
    async registerVoto(@Param('id') idPauta: string, @Body() resource: RegisterVotoResource, @Res() response: Response) {
        const pauta: Pauta = await this.pautasService.findById(idPauta);

        if (!pauta) {
            return response
                .status(HttpStatus.NOT_FOUND)
                .send(new ErrorResponse("Pauta não encontrada."));
        }

        const result = await this.votoService.registerVoto(pauta, resource.cpf, resource.optionVoto);
        if (result.isError()) {
            const error = result.error;
            return response.status(error.status).send(new ErrorResponse(error.message))
        }

        return response.status(HttpStatus.ACCEPTED).send();
    }
}
