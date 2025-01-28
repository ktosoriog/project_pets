import { post, put } from './../util/api';

interface LoginResponse {
    token: string;
    correo: string;
    rol: string;
    idUsuario: string;
    nombreUsuario: string;
}

export function getAuthToken(): string {
    const token = localStorage.getItem('authToken');
    return token ?? '';
}

export async function login(correo: string, clave: string): Promise<LoginResponse> {
    const response = await post<LoginResponse, { correo: string; clave: string }>(
        '/api/auth/login',
        { correo, clave }
    );
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userRole', response.rol);
    localStorage.setItem('userEmail', response.correo);
    localStorage.setItem('idUsuario', response.idUsuario);
    localStorage.setItem('nombreUsuario', response.nombreUsuario);
    return response;
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

export async function registroCliente(usuario: {
    nombre: string;
    apellido: string;
    identificacion: string;
    direccion: string;
    telefono: string;
    correo: string;
    clave: string;
}): Promise<void> {
    await post('/api/auth/registro-cliente', usuario);
}

export async function solicitarRestablecerClave(correo: string): Promise<string> {
    return post<string, null>('/api/auth/solicitar-restablecer-clave', null, {
        params: { correo }
    });
}

export async function restablecerClave(token: string, nuevaClave: string): Promise<string> {
    return put<string, null>('/api/auth/restablecer-clave', null, {
        params: { token, nuevaClave }
    });
}

export function getNombre(): string {
    return localStorage.getItem('nombreUsuario') ?? '';
}

export function idUsuario(): string {
    return localStorage.getItem('idUsuario') ?? '';
}