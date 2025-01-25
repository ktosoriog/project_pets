package co.com.pets.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.dto.UsuarioDTO;
import co.com.pets.entity.Usuario;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.repository.RolRepository;
import co.com.pets.repository.UsuarioRepository;
import co.com.pets.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	private final RolRepository rolRepository;
	private final UsuarioRepository usuarioRepository;
	private final PasswordEncoder passwordEncoder;

	public UsuarioServiceImpl(UsuarioRepository usuarioRepository, RolRepository rolRepository,
			PasswordEncoder passwordEncoder) {
		this.usuarioRepository = usuarioRepository;
		this.rolRepository = rolRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UsuarioDTO buscarPorId(Integer idUsuario) {
		Usuario user = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new ObjetoNoEncontradoException(MensajesConstant.USUARIO_NO_ENCONTRADO_ID));
		return mapearDTO(user);
	}

	private UsuarioDTO mapearDTO(Usuario usuario) {
		return new UsuarioDTO(usuario.getIdUsuario(), usuario.getCorreo(), usuario.getApeUsuario(), usuario.getCorreo(),
				(usuario.getRol() != null ? usuario.getRol().getIdRol() : null),
				(usuario.getRol() != null ? usuario.getRol().getNomRol() : ""), "Protegida");
	}

	@Override
	public UsuarioDTO buscarPorCorreo(String correo) {
		Usuario user = usuarioRepository.findByCorreo(correo);
		if (user != null) {
			return mapearDTO(user);
		}
		throw new ObjetoNoEncontradoException(MensajesConstant.USUARIO_NO_ENCONTRADO_EMAIL);
	}
}