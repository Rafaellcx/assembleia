import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Pauta } from "./pauta.entity";
import { ApiProperty } from "@nestjs/swagger";
export class CreatePautaResource {
    @IsNotEmpty({ message: 'Descrição deve ser informada.' })
    @ApiProperty({name: 'description', example: 'Votação sobre aumento do valor do condomínio'})
    description: string;
}

export class PautaResource {
    @ApiProperty()
    id: string; 
    @ApiProperty()
    description: string;
    @ApiProperty()
    status: string;
}

export class NewSessionResource {
    @ApiProperty({default: 10})
    minutes: number;
}

export function toRepresentation(entity: Pauta) : PautaResource {
    const resource = new PautaResource();
 
    resource.id = entity.id;
    resource.description = entity.description;
    resource.status = entity.obtainStatus();

    return resource;
}

export function toDomain(resource: CreatePautaResource) : Pauta {
    const pauta = new Pauta();
    pauta.description = resource.description;
    return pauta;
}