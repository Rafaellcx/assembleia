import { Injectable } from '@nestjs/common';
import { Person, PersonUpdatingRequest } from './person';
@Injectable()
export class PeopleService {
    people: Person[] = []
    
    list(): Person[] {
        return this.people;
    }
    
    findById(id: number): Person {
        return this.people.find(person => person.id == id)
    }
    
    save(person: Person) {
        this.people.push(person);
    }

    update(id: number, updatingPerson: PersonUpdatingRequest) {
        this.people.forEach( person => {
            if (id == person.id) {
                person.name = updatingPerson.name;
            }           
        })

        /**
         * OBS
         * function (person) {} == person => {}
         */
    }

    delete(id: number) {
        const newList = this.people.filter(item => item.id != id)
        this.people = newList;
    }
}
