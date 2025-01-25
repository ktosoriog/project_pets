import axios from 'axios';
import { getAuthToken } from './authService';

export interface TipoServicio {
    idTipoServ?: number;
    nombre: string;
    precio: number;
    descripcion: string;
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

export async function listarTipoServiciosPaginado(pagina: number): Promise<{
    content: TipoServicio[];
    totalPages: number;
    totalElements: number;
}> {
    try {
        const resp = await axios.get(`${API_URL}/api/admin/tipos-servicio`, {
            headers: getHeaders(),
            params: { pagina }
        });
        return resp.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

export async function listarTipoServiciosTodo(): Promise<TipoServicio[]> {
    try {
        const resp = await axios.get<TipoServicio[]>(`${API_URL}/api/admin/tipos-servicio/todo`, {
            headers: getHeaders()
        });
        return resp.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

export async function crearTipoServicio(ts: TipoServicio): Promise<TipoServicio> {
    try {
        const resp = await axios.post<TipoServicio>(`${API_URL}/api/admin/tipos-servicio`, ts, {
            headers: getHeaders()
        });
        return resp.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

export async function actualizarTipoServicio(
    id: number,
    ts: TipoServicio
): Promise<TipoServicio> {
    try {
        const resp = await axios.put<TipoServicio>(`${API_URL}/api/admin/tipos-servicio/${id}`, ts, {
            headers: getHeaders()
        });
        return resp.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

export async function eliminarTipoServicio(id: number): Promise<void> {
    try {
        await axios.delete(`${API_URL}/api/admin/tipos-servicio/${id}`, {
            headers: getHeaders()
        });
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}