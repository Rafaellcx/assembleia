import { Injectable } from '@nestjs/common';
import { Person, PersonUpdatingRequest } from './person';
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

    update(id: number, updatingPerson: PersonUpdatingRequest) {
        this.people.forEach(function (person) {
            if (id == person.id) {
                person.name = updatingPerson.name;
            }           
        })
    }
}
