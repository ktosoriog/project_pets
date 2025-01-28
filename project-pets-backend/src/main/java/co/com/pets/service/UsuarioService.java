package co.com.pets.service;

import java.util.List;

import org.springframework.data.domain.Page;

import co.com.pets.dto.UsuarioDTO;

public interface UsuarioService {

	UsuarioDTO buscarPorId(Integer idUsuario);

	UsuarioDTO buscarPorCorreo(String correo);

	List<UsuarioDTO> listarTodos();

	UsuarioDTO crearUsuario(UsuarioDTO usuario);

	UsuarioDTO actualizarUsuario(Integer id, UsuarioDTO usuario);

	void eliminarUsuario(Integer id);

	Page<UsuarioDTO> listarPaginado(int pagina, int size);

	List<UsuarioDTO> listarClientesConFiltro(String filtro);

}
