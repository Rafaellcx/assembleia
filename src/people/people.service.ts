import { Injectable } from '@nestjs/common';
import { Person } from './person';
@Injectable()
export class PeopleService {
    people: Person[] = []
    
    list(): Person[] {
        return this.people;
    }
    
    findById(id: number): Person {
        const foundPerson = this.people.find(function (person) {
            return person.id == id
        })
        
        return foundPerson
    }
    
    save(person: Person) {
        this.people.push(person);
    }
}
