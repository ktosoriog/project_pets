package co.com.pets.service;

import org.springframework.data.domain.Page;
import co.com.pets.dto.HistoriaClinicaDTO;

public interface HistoriaClinicaService {

	Page<HistoriaClinicaDTO> listarPorServicio(Integer idServicio, int pagina, int size);

	HistoriaClinicaDTO crearHistoria(HistoriaClinicaDTO dto, Integer idServicio);

	HistoriaClinicaDTO editarHistoria(Integer idHistoria, HistoriaClinicaDTO dto);

	void eliminarHistoria(Integer idHistoria);
}
