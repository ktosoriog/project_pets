// src/services/historiaClinicaService.ts
import { get, post, put, del } from '../util/api';

export interface HistoriaClinica {
  idHistoria?: number;
  idServicio?: number;
  fechaServ?: string;
  detalle?: string;
}

export async function listarHistoriaPorServicio(idServicio: number, pagina = 0):
  Promise<{ content: HistoriaClinica[], totalPages: number, totalElements: number }> {
  return get(`/api/historia/${idServicio}`, { params: { pagina } });
}

export async function crearHistoria(idServicio: number, dto: Partial<HistoriaClinica>): Promise<HistoriaClinica> {
  return post(`/api/historia/${idServicio}`, dto);
}

export async function editarHistoria(idHistoria: number, dto: Partial<HistoriaClinica>): Promise<HistoriaClinica> {
  return put(`/api/historia/${idHistoria}`, dto);
}

export async function eliminarHistoria(idHistoria: number): Promise<void> {
  return del(`/api/historia/${idHistoria}`);
}
