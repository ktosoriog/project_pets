package co.com.pets.service.impl;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.entity.Usuario;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.repository.UsuarioRepository;

@Service
public class DetallesUsuarioService implements UserDetailsService {

	private final UsuarioRepository usuarioRepository;

	public DetallesUsuarioService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findByCorreo(username);
		if (usuario == null) {
			throw new ObjetoNoEncontradoException(MensajesConstant.USUARIO_NO_ENCONTRADO_EMAIL);
		}
		String rolNombre = usuario.getRol().getNomRol();
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + rolNombre.toUpperCase());
		return new User(usuario.getCorreo(), usuario.getClave(), Collections.singletonList(authority));
	}

}
