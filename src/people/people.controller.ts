import { Controller, Get, Res, Post, Body, Param } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Response, response } from 'express';
import { Person } from './person';
@Controller('people')
export class PeopleController {
    
    constructor(private service: PeopleService) {
        this.service = service
    }

    @Get()
    list(@Res() response: Response) {
        const list = this.service.list();
        return response.status(200).send(list);
    }

    @Get('/:id')
    getById(@Param('id') id: number, @Res() response: Response) {
        const person = this.service.findById(id);

        if(!person) return response.status(404).send()

        return response.status(200).send(person);
    }

    @Post()
    save(@Body() person: Person, @Res() response: Response) {
        this.service.save(person);
        return response.status(201).send("Save with success.")
    }

}
