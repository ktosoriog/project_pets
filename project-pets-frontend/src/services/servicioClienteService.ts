// src/services/servicioClienteService.ts
import { get, post, put } from '../util/api';

export interface Servicio {
    idServicio?: number;
    idMascota?: number;
    idTipoServ?: number;
    fechaServ?: string;   // "YYYY-MM-DD"
    horaServicio?: string; // "08:00"
    estado?: string;
    nomMascota?: string;
    nomTipoServ?: string;
    nomVet?: string;
    apeVet?: string;
    // ...
}

/** Listar con paginación */
export async function listarServiciosClientePaginado(pagina: number, filtro: string):
    Promise<{ content: Servicio[], totalPages: number, totalElements: number }> {
    return get(`/api/cliente/servicios`, { params: { pagina, filtro } });
}

/** Crear */
export async function crearServicioCliente(s: Servicio): Promise<Servicio> {
    return post(`/api/cliente/servicios`, s);
}

/** Cancelar */
export async function cancelarServicioCliente(idServicio: number): Promise<Servicio> {
    return put(`/api/cliente/servicios/${idServicio}/cancelar`, {});
}
