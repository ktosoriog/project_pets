import { get, post, put, del } from './../util/api';

export interface Usuario {
    idUsuario?: number;
    nombre: string;
    apellido: string;
    identificacion?: string;
    direccion?: string;
    correo: string;
    telefono?: string;
    clave?: string;
    idRol?: number;
    nombreRol?: string;
    fechaRegistro?: string;
    fechaActualizacion?: string;
}

export async function listarUsuariosPaginado(
    pagina: number
): Promise<{ content: Usuario[]; totalPages: number; totalElements: number }> {
    return get('/api/admin/usuarios', { params: { pagina } });
}

export async function listarUsuariosTodo(): Promise<Usuario[]> {
    return get('/api/admin/usuarios/todo');
}

export async function crearUsuario(usuario: Usuario): Promise<Usuario> {
    return post('/api/admin/usuarios', usuario);
}

export async function actualizarUsuario(id: number, usuario: Usuario): Promise<Usuario> {
    return put(`/api/admin/usuarios/${id}`, usuario);
}

export async function eliminarUsuario(id: number): Promise<void> {
    return del(`/api/admin/usuarios/${id}`);
}