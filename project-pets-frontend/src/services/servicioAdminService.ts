// src/services/servicioAdminService.ts
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


export async function listarServiciosAdminPaginado(pagina: number, filtro: string):
    Promise<{ content: Servicio[], totalPages: number, totalElements: number }> {
    return get(`/api/admin/servicios`, { params: { pagina, filtro } });
}

export async function listarServiciosAdminTodo(): Promise<Servicio[]> {
    return get(`/api/admin/servicios/todo`);
}

/** Si admin puede cambiar estado */
export async function actualizarEstadoServicioAdmin(idServicio: number, estado: string): Promise<Servicio> {
    return put(`/api/admin/servicios/${idServicio}/estado`, { estado });
}
