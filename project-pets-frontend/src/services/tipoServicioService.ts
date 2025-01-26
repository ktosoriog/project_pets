import { get, post, put, del } from './../util/api';

export interface TipoServicio {
    idTipoServ?: number;
    nombre: string;
    precio: number;
    descripcion: string;
}

export async function listarTipoServiciosPaginado(
    pagina: number
): Promise<{ content: TipoServicio[]; totalPages: number; totalElements: number }> {
    return get('/api/admin/tipos-servicio', { params: { pagina } });
}

export async function listarTipoServiciosTodo(): Promise<TipoServicio[]> {
    return get('/api/admin/tipos-servicio/todo');
}

export async function crearTipoServicio(ts: TipoServicio): Promise<TipoServicio> {
    return post('/api/admin/tipos-servicio', ts);
}

export async function actualizarTipoServicio(
    id: number,
    ts: TipoServicio
): Promise<TipoServicio> {
    return put(`/api/admin/tipos-servicio/${id}`, ts);
}

export async function eliminarTipoServicio(id: number): Promise<void> {
    return del(`/api/admin/tipos-servicio/${id}`);
}