import axios from 'axios';
import { getAuthToken } from './authService';

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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function getHeaders() {
    const token = getAuthToken();
    return {
        Authorization: `Bearer ${token}`
    };
}

function procesarErrorAxios(error: unknown): Error {
    if (axios.isAxiosError(error)) {
        const serverMessage = (error.response?.data as { message?: string })?.message;
        if (serverMessage) {
            return new Error(serverMessage);
        }
        if (error.request) {
            return new Error('No hay conexión con el servidor');
        }
        return new Error('Error en el servidor');
    }
    if (error instanceof Error) {
        return error;
    }
    return new Error('Error desconocido');
}

// Paginado => GET /api/admin/usuarios?pagina=X
// Retorna { content, totalPages, etc. }
export async function listarUsuariosPaginado(pagina: number): Promise<{
    content: Usuario[];
    totalPages: number;
    totalElements: number;
}> {
    try {
        const resp = await axios.get(`${API_URL}/api/admin/usuarios`, {
            headers: getHeaders(),
            params: { pagina }
        });
        return resp.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

// Obtener todos => GET /api/admin/usuarios/todo
export async function listarUsuariosTodo(): Promise<Usuario[]> {
    try {
        const resp = await axios.get<Usuario[]>(`${API_URL}/api/admin/usuarios/todo`, {
            headers: getHeaders()
        });
        return resp.data;

    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

// Crear
export async function crearUsuario(usuario: Usuario): Promise<Usuario> {
    try {
        const resp = await axios.post<Usuario>(`${API_URL}/api/admin/usuarios`, usuario, {
            headers: getHeaders()
        });
        return resp.data;

    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

// Actualizar
export async function actualizarUsuario(id: number, usuario: Usuario): Promise<Usuario> {
    try {

        const resp = await axios.put<Usuario>(`${API_URL}/api/admin/usuarios/${id}`, usuario, {
            headers: getHeaders()
        });
        return resp.data;

    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

// Eliminar
export async function eliminarUsuario(id: number): Promise<void> {
    try {
        await axios.delete(`${API_URL}/api/admin/usuarios/${id}`, {
            headers: getHeaders()
        });
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}