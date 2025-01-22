import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface LoginResponse {
    token: string;
    correo: string;
    rol: string;
}

export async function login(correo: string, clave: string): Promise<LoginResponse> {
    try {
        const resp = await axios.post<LoginResponse>(`${API_URL}/api/auth/login`, { correo, clave });
        localStorage.setItem('authToken', resp.data.token);
        localStorage.setItem('userRole', resp.data.rol);
        localStorage.setItem('userEmail', resp.data.correo);
        return resp.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const serverMessage = (error.response?.data as { message?: string })?.message;
            if (serverMessage) {
                throw new Error(serverMessage);
            }
            if (error.request) {
                throw new Error('No hay conexión con el servidor');
            }
            throw new Error('Error en el servidor');
        }
        throw new Error('Error desconocido');
    }
}

export function estaLogueado(): boolean {
    return !!localStorage.getItem('authToken');
}

export function getRol(): string {
    return localStorage.getItem('userRole') ?? '';
}

export function logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
}