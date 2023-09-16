import { Controller, Get, Res, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Response, response } from 'express';
import { Person, PersonUpdatingRequest } from './person';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('people')
@ApiTags('Peoples')
export class PeopleController {
    
    constructor(private service: PeopleService) {
        this.service = service
    }

    @Get()
    @ApiOperation({description: 'List people'})    
    list(@Res() response: Response) {
        const list = this.service.list();
        return response.status(200).send(list);
    }

    @Get('/:id')
    @ApiOperation({description: 'Get a person'})    
    getById(@Param('id') id: number, @Res() response: Response) {
        const person = this.service.findById(id);

        if(!person) return response.status(404).send()

        return response.status(200).send(person);
    }

    @Post()
    @ApiOperation({description: 'Save a person'})    
    save(@Body() person: Person, @Res() response: Response) {
        this.service.save(person);
        return response.status(201).send("Save with success.")
    }

    @Put('/:id')
    @ApiOperation({description: 'Update a person'})    
    update(
        @Param('id') id: number,
        @Body() personUpdateData: PersonUpdatingRequest,
        @Res() response: Response
    ) {
        const person = this.service.findById(id);

        if(!person) return response.status(404).send()

        this.service.update(id, personUpdateData);

        return response.status(204).send();
    }

    @Delete('/:id')
    @ApiOperation({description: 'Delete a person'})    
    delete(@Param('id') id: number,@Res() response: Response) {
        const person = this.service.findById(id);

        if(!person) return response.status(404).send()

        this.service.delete(id)
        
        return response.status(204).send();
    }
}
