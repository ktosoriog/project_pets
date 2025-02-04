// src/services/servicioVetService.ts
import { get, put } from '../util/api';

export interface Servicio {
    idServicio?: number;
    idMascota?: number;
    idTipoServ?: number;
    fechaServ?: string;     // "YYYY-MM-DD"
    horaServicio?: string;  // "08:00"
    estado?: string;
    nomMascota?: string;
    nomTipoServ?: string;
    nomVet?: string;
    apeVet?: string;

    // Estos nuevos campos que usas en el front:
    nomCliente?: string;
    apeCliente?: string;
    identCliente?: string;
}

/** Listar con paginación (vet) */
export async function listarServiciosVetPaginado(pagina: number, filtro: string):
    Promise<{ content: Servicio[], totalPages: number, totalElements: number }> {
    return get(`/api/vet/servicios`, { params: { pagina, filtro } });
}

export async function listarTodoServiciosVet(): Promise<Servicio[]> {
    // Para exportar CSV
    return get(`/api/vet/servicios/todo`); // en tu back, si lo creas
}

/** Aceptar un servicio */
export async function aceptarServicio(idServicio: number): Promise<Servicio> {
    return put(`/api/vet/servicios/${idServicio}/aceptar`, {});
}

/** Cambiar estado */
export async function actualizarEstadoServicio(idServicio: number, estado: string): Promise<Servicio> {
    return put(`/api/vet/servicios/${idServicio}/estado`, { estado });
}
