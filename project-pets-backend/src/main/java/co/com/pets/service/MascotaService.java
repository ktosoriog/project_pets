package co.com.pets.service;

import java.util.List;

import org.springframework.data.domain.Page;

import co.com.pets.dto.MascotaDTO;

public interface MascotaService {

	Page<MascotaDTO> listarPaginado(int pagina, int size, String filtro);

	List<MascotaDTO> listarTodo();

	MascotaDTO crear(MascotaDTO mascotaDTO, Integer idUsuarioDueno);

	MascotaDTO actualizar(Integer id, MascotaDTO mascotaDTO);

	void eliminar(Integer id);

	// Filtrar por idUsuario (Cliente)
	Page<MascotaDTO> listarPaginadoPorUsuario(int pagina, int size, Integer idUsuario, String filtro);

	List<MascotaDTO> listarTodoPorUsuario(Integer idUsuario);

}
