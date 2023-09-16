import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Res } from '@nestjs/common';
import { PautasService } from './pautas.service';
import { CreatePautaResource, NewSessionResource, toDomain, toRepresentation } from './pautas.resource';
import { Response } from 'express';
import { Pauta } from './pauta.entity';
import { ErrorResponse } from 'src/common/error.resource';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('pautas')
@ApiTags('Pautas')    
export class PautasController {

    private readonly logger = new Logger(PautasController.name)

    constructor(
        private pautaService: PautasService
    ) { }
    
    @Post()
    @ApiOperation({description: 'Create a new agenda'})    
    async save(@Body() pauta: CreatePautaResource, @Res() response: Response) {
        const pautaDomain: Pauta = toDomain(pauta);
        const result = await this.pautaService.save(pautaDomain);

        if (result.isError()) {
            this.logger.error('Erro ao tentar criar uma nova pauta: ' + result.error.message);
            return response
                .status(HttpStatus.CONFLICT)
                .send(new ErrorResponse(result.error.message));
        }

        return response.status(HttpStatus.CREATED).send(toRepresentation(result.value));
    }

    @Get()
    @ApiOperation({description: 'List agendas'})
    async list(@Res() response: Response) {
        const result = await this.pautaService.findAll();

        return response.status(HttpStatus.OK).send(result.map(toRepresentation));
    }

    @Post(':id/session')
    @ApiOperation({description: 'Start a agenda'})    
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
