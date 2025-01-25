package co.com.pets.service;

import co.com.pets.dto.UsuarioDTO;

public interface UsuarioService {

	UsuarioDTO buscarPorId(Integer idUsuario);

	UsuarioDTO buscarPorCorreo(String correo);

}
