import { Pauta } from "./pauta.entity";

export class CriarPautaResource {
    description: string;
}

export function toDomain(resource: CriarPautaResource) : Pauta {
    return {
        description: resource.description
    }
}