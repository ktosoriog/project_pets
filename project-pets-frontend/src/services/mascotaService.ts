import { get, post, put, del } from '../util/api';

export interface Mascota {
    idMascota?: number;
    nombre: string;
    fechaNacimiento?: string;  // "YYYY-MM-DD"
    idRaza: number;
    nomRaza?: string;
    idEspecie?: number;
    nomEspecie?: string;
    idDueno?: number;
    nombreDueno?: string;
    identificacionDueno?: string;
}

/** ADMIN */
export async function listarMascotasAdminPaginado(pagina: number, filtro: string):
    Promise<{ content: Mascota[]; totalPages: number; totalElements: number }> {
    return get(`/api/admin/mascotas`, { params: { pagina, filtro } });
}

export async function listarMascotasAdminTodo(): Promise<Mascota[]> {
    return get(`/api/admin/mascotas/todo`);
}

export async function crearMascotaAdmin(m: Mascota): Promise<Mascota> {
    return post(`/api/admin/mascotas`, m);
}

export async function actualizarMascotaAdmin(id: number, m: Mascota): Promise<Mascota> {
    return put(`/api/admin/mascotas/${id}`, m);
}

export async function eliminarMascotaAdmin(id: number): Promise<void> {
    return del(`/api/admin/mascotas/${id}`);
}

/** CLIENTE */
export async function listarMascotasClientePaginado(pagina: number, filtro: string):
    Promise<{ content: Mascota[]; totalPages: number; totalElements: number }> {
    return get(`/api/cliente/mascotas`, { params: { pagina, filtro } });
}

export async function listarMascotasClienteTodo(): Promise<Mascota[]> {
    return get(`/api/cliente/mascotas/todo`);
}

export async function crearMascotaCliente(m: Mascota): Promise<Mascota> {
    return post(`/api/cliente/mascotas`, m);
}

export async function actualizarMascotaCliente(id: number, m: Mascota): Promise<Mascota> {
    return put(`/api/cliente/mascotas/${id}`, m);
}

export async function eliminarMascotaCliente(id: number): Promise<void> {
    return del(`/api/cliente/mascotas/${id}`);
}