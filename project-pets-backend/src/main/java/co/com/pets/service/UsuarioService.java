package co.com.pets.service;

import java.util.List;

import co.com.pets.dto.UsuarioDTO;

public interface UsuarioService {

	UsuarioDTO buscarPorId(Integer idUsuario);

	List<UsuarioDTO> listarUsuarios();

	UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO);

	UsuarioDTO actualizarUsuario(Integer idUsuario, UsuarioDTO usuarioDTO);

	void eliminarUsuario(Integer idUsuario);

	UsuarioDTO buscarPorCorreo(String correo);

}
