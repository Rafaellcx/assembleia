import { Pauta } from "./pauta.entity";

export class CriarPautaResource {
    description: string;
}

export class PautaResource {
    id: string; 
    description: string;
    status: string;
}

export function toRepresentation(entity: Pauta) : PautaResource {
    const resource = new PautaResource();
 
    resource.id = entity.id;
    resource.description = entity.description;
    resource.status = entity.obtainStatus();

    return resource;
}

export function toDomain(resource: CriarPautaResource) : Pauta {
    const pauta = new Pauta();
    pauta.description = resource.description;
    return pauta;
}