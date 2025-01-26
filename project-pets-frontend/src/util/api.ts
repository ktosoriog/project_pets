import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAuthToken } from '../services/authService';
import { LoadingService } from './loadingService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

axios.interceptors.request.use(config => {
    LoadingService.start();
    return config;
});

axios.interceptors.response.use(
    response => {
        LoadingService.stop();
        return response;
    },
    error => {
        LoadingService.stop();
        return Promise.reject(error);
    }
);

export function getHeaders() {
    const token = getAuthToken();
    return {
        Authorization: `Bearer ${token}`,
    };
}

export function procesarErrorAxios(error: unknown): Error {
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

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.get(`${API_URL}${url}`, {
            ...config,
            headers: {
                ...getHeaders(),
                ...(config?.headers || {}),
            },
        });
        return response.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

export async function post<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.post(`${API_URL}${url}`, data, {
            ...config,
            headers: {
                ...getHeaders(),
                ...(config?.headers || {}),
            },
        });
        return response.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

export async function put<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.put(`${API_URL}${url}`, data, {
            ...config,
            headers: {
                ...getHeaders(),
                ...(config?.headers || {}),
            },
        });
        return response.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.delete(`${API_URL}${url}`, {
            ...config,
            headers: {
                ...getHeaders(),
                ...(config?.headers || {}),
            },
        });
        return response.data;
    } catch (error) {
        throw procesarErrorAxios(error);
    }
}