package co.com.pets.service;

import java.util.List;

import org.springframework.data.domain.Page;

import co.com.pets.dto.TipoServicioDTO;

public interface TipoServicioService {

	List<TipoServicioDTO> listarTodo();

	Page<TipoServicioDTO> listarPaginado(int pagina, int size, String filtro);

	TipoServicioDTO crear(TipoServicioDTO dto);

	TipoServicioDTO actualizar(Integer id, TipoServicioDTO dto);

	void eliminar(Integer id);
}
