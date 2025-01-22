package co.com.pets.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.dto.UsuarioDTO;
import co.com.pets.entity.Rol;
import co.com.pets.entity.Usuario;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.exception.OperacionInvalidaException;
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

	@Override
	public List<UsuarioDTO> listarUsuarios() {
		return usuarioRepository.findAll().stream().map(this::mapearDTO).toList();
	}

	@Override
	public UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO) {
		if (usuarioDTO.getCorreo() == null || usuarioDTO.getClave() == null || usuarioDTO.getNombreCompleto() == null) {
			throw new OperacionInvalidaException("Datos incompletos para crear el usuario");
		}

		Usuario usuario = new Usuario();
		usuario.setCorreo(usuarioDTO.getCorreo());
		usuario.setClave(passwordEncoder.encode(usuarioDTO.getClave()));

		String[] nombres = usuarioDTO.getNombreCompleto().split(" ");
		if (nombres.length >= 1) {
			usuario.setNomUsuario(nombres[0]);
		}
		if (nombres.length >= 2) {
			usuario.setApeUsuario(nombres[1]);
		}

		Rol rol = rolRepository.findAll().stream().findFirst()
				.orElseThrow(() -> new ObjetoNoEncontradoException("No se encontraron roles disponibles"));
		usuario.setRol(rol);

		Usuario nuevo = usuarioRepository.save(usuario);
		return mapearDTO(nuevo);
	}

	@Override
	public UsuarioDTO actualizarUsuario(Integer idUsuario, UsuarioDTO usuarioDTO) {
		Usuario user = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new ObjetoNoEncontradoException(MensajesConstant.USUARIO_NO_ENCONTRADO_ID));
		if (usuarioDTO.getCorreo() == null || usuarioDTO.getNombreCompleto() == null) {
			throw new OperacionInvalidaException("Datos incompletos para actualizar el usuario");
		}
		user.setCorreo(usuarioDTO.getCorreo());
		user.setNomUsuario(usuarioDTO.getNombreCompleto());
		Usuario actualizado = usuarioRepository.save(user);
		return mapearDTO(actualizado);
	}

	@Override
	public void eliminarUsuario(Integer idUsuario) {
		Usuario user = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new ObjetoNoEncontradoException(MensajesConstant.USUARIO_NO_ENCONTRADO_ID));
		try {
			usuarioRepository.delete(user);
		} catch (Exception e) {
			throw new OperacionInvalidaException("No se pudo eliminar el usuario");
		}
	}

	private UsuarioDTO mapearDTO(Usuario usuario) {
		String nombreCompleto = (usuario.getNomUsuario() == null ? "" : usuario.getNomUsuario()) + " "
				+ (usuario.getApeUsuario() == null ? "" : usuario.getApeUsuario());
		return new UsuarioDTO(usuario.getIdUsuario(), nombreCompleto.trim(), usuario.getCorreo(),
				(usuario.getRol() != null ? usuario.getRol().getNomRol() : ""));
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