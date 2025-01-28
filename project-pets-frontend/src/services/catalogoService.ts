import { get } from '../util/api';

export interface Especie {
    idEspecie: number;
    nomEspecie: string;
}

export interface Raza {
    idRaza: number;
    nomRaza: string;
    idEspecie: number;
    descripcion?: string;
}

export async function listarEspecies(): Promise<Especie[]> {
    return get<Especie[]>('/api/catalogo/especies');
}

export async function listarRazasPorEspecie(idEspecie: number): Promise<Raza[]> {
    return get<Raza[]>('/api/catalogo/razas', { params: { idEspecie } });
}
