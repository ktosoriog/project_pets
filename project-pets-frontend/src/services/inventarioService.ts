// src/services/inventarioService.ts
import { get, post, put, del } from '../util/api';

export interface Inventario {
  idInventario?: number;

  codigoProducto: string;    // Filtro 1
  nomProducto: string;       // Filtro 2
  precioUnitario?: number;
  descripcion?: string;

  canDisponible: number;
  ingreso?: string;   // "YYYY-MM-DD"
  salida?: string;    // "YYYY-MM-DD"
  stopMin: number;
}

/** ADMINISTRADOR */
export async function listarInventarioAdminPaginado(
  pagina: number,
  filtro: string
): Promise<{ content: Inventario[]; totalPages: number; totalElements: number }> {
  return get(`/api/admin/inventario`, { params: { pagina, filtro } });
}

export async function listarInventarioAdminTodo(
  filtro: string
): Promise<Inventario[]> {
  return get(`/api/admin/inventario/todo`, { params: { filtro } });
}

export async function crearInventarioAdmin(inv: Inventario): Promise<Inventario> {
  return post(`/api/admin/inventario`, inv);
}

export async function actualizarInventarioAdmin(
  id: number,
  inv: Inventario
): Promise<Inventario> {
  return put(`/api/admin/inventario/${id}`, inv);
}

export async function eliminarInventarioAdmin(id: number): Promise<void> {
  return del<void>(`/api/admin/inventario/${id}`);
}

/** VETERINARIO */
export async function listarInventarioVetPaginado(
  pagina: number,
  filtro: string
): Promise<{ content: Inventario[]; totalPages: number; totalElements: number }> {
  return get(`/api/vet/inventario`, { params: { pagina, filtro } });
}

export async function listarInventarioVetTodo(
  filtro: string
): Promise<Inventario[]> {
  return get(`/api/vet/inventario/todo`, { params: { filtro } });
}

export async function buscarInventarioPorIdVet(id: number): Promise<Inventario> {
  return get(`/api/vet/inventario/${id}`);
}
