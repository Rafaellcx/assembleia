import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { PautasService } from './pautas.service';
import { CriarPautaResource, NewSessionResource, toDomain, toRepresentation } from './pautas.resource';
import { Response } from 'express';
import { Pauta } from './pauta.entity';
import { ErrorResponse } from 'src/common/error.resource';

@Controller('pautas')
export class PautasController {

    constructor(
        private pautaService: PautasService
    ) { }
    
    @Post()
    async save(@Body() pauta: CriarPautaResource, @Res() response: Response) {
        const pautaDomain: Pauta = toDomain(pauta);
        const result = await this.pautaService.save(pautaDomain);

        if (result.isError()) {
            return response
                .status(HttpStatus.CONFLICT)
                .send(new ErrorResponse(result.error.message));
        }

        return response.status(HttpStatus.CREATED).send(toRepresentation(result.value));
    }

    @Get()
    async list(@Res() response: Response) {
        const result = await this.pautaService.findAll();

        return response.status(HttpStatus.OK).send(result.map(toRepresentation));
    }

    @Post(':id/session')
    async createSession(@Param('id') id: string, @Body() resource: NewSessionResource, @Res() response: Response) {
        const pauta: Pauta = await this.pautaService.findById(id);

        if (!pauta) {
            return response
                .status(HttpStatus.NOT_FOUND)
                .send(new ErrorResponse("Pauta não encontrada."));
        }

        const success = await this.pautaService.startSession(pauta, resource.minutes);

        if (success) {
            return response
                .status(HttpStatus.OK)
                .send();
        }
        const errorResponse = new ErrorResponse("Não foi possível inicial uma sessão para esta pauta, sua sessão já foi iniciada ou encerrada.");
        return response.status(HttpStatus.CONFLICT).send(errorResponse);
    }
}
