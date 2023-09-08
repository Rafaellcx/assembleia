import { Injectable } from '@nestjs/common';
import { Person } from './person';
@Injectable()
export class PeopleService {
    people: Person[] = [{id:1, name: "Fulano"}]

    list(): Person[] {
        return this.people;
    }
}
