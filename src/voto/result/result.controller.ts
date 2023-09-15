import { Controller,Get, HttpStatus, Param, Res } from '@nestjs/common';
import { VotoService } from '../voto.service';
import { Response } from 'express';
import { PautasService } from 'src/pautas/pautas.service';
import { ErrorResponse } from 'src/common/error.resource';

@Controller('agenda/:id/results')
export class ResultController {

    constructor(
        private readonly voteService: VotoService,
        private readonly pautaService: PautasService,
    ) {}

    @Get()
    async getResult(@Param('id') idPauta: string, @Res() response: Response) {
        const pauta = await this.pautaService.findById(idPauta);

        if (!pauta) {
            return response
                .status(HttpStatus.NOT_FOUND)
                .send(new ErrorResponse("Pauta não encontrada."));
        }

        const result = await this.voteService.getResult(pauta);
        
        if (result.isError()) {
            return response
                .status(result.error.status)
                .send(new ErrorResponse(result.error.message));
        }

        return response.status(HttpStatus.OK).send(result.value);
    }
}
