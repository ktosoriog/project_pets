package co.com.pets.service;

import org.springframework.data.domain.Page;
import co.com.pets.dto.InventarioDTO;
import java.util.List;

public interface InventarioService {

	Page<InventarioDTO> listarPaginado(int pagina, int size, String filtro);

	List<InventarioDTO> listarTodo(String filtro);

	InventarioDTO crear(InventarioDTO dto);

	InventarioDTO actualizar(Integer idInventario, InventarioDTO dto);

	void eliminar(Integer idInventario);

	InventarioDTO buscarPorId(Integer idInventario);

}
