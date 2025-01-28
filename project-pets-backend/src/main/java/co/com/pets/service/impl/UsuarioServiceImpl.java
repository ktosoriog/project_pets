package co.com.pets.service.impl;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
		return convertirAUsuarioDTO(user);
	}

	@Override
	public UsuarioDTO buscarPorCorreo(String correo) {
		Usuario user = usuarioRepository.findByCorreo(correo);
		if (user != null) {
			return convertirAUsuarioDTO(user);
		}
		throw new ObjetoNoEncontradoException(MensajesConstant.USUARIO_NO_ENCONTRADO_EMAIL);
	}

	@Override
	public List<UsuarioDTO> listarTodos() {
		return usuarioRepository.findAll().stream().map(this::convertirAUsuarioDTO).toList();
	}

	@Override
	public UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO) {
		try {
			Usuario usuario = convertirADominio(usuarioDTO, null);
			usuario.setFechaRegistro(new Date());
			usuario.setFechaActualizacion(null);
			if (usuario.getClave() != null && !usuario.getClave().isEmpty()) {
				usuario.setClave(passwordEncoder.encode(usuario.getClave()));
			}
			Usuario nuevo = usuarioRepository.save(usuario);
			return convertirAUsuarioDTO(nuevo);

		} catch (DataIntegrityViolationException ex) {
			if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException
					&& ex.getCause().getMessage().contains("Correo_UNIQUE")) {
				throw new OperacionInvalidaException(
						"El correo proporcionado ya está registrado: " + usuarioDTO.getCorreo());
			}
			throw ex;
		}
	}

	@Override
	public UsuarioDTO actualizarUsuario(Integer id, UsuarioDTO usuarioDTO) {
		try {
			Usuario existente = usuarioRepository.findById(id)
					.orElseThrow(() -> new ObjetoNoEncontradoException("Usuario no encontrado con id " + id));
			existente.setNomUsuario(usuarioDTO.getNombre());
			existente.setApeUsuario(usuarioDTO.getApellido());
			existente.setCorreo(usuarioDTO.getCorreo());
			existente.setFechaActualizacion(new Date());
			existente.setIdentificacion(usuarioDTO.getIdentificacion());
			existente.setTelefono(usuarioDTO.getTelefono());
			existente.setDireccion(usuarioDTO.getDireccion());
			String clave = usuarioDTO.getClave();
			if (clave != null && !clave.isEmpty()) {
				existente.setClave(passwordEncoder.encode(clave));
			}
			if (usuarioDTO.getIdRol() != null) {
				Rol rol = rolRepository.findById(usuarioDTO.getIdRol())
						.orElseThrow(() -> new ObjetoNoEncontradoException("Rol no encontrado"));
				existente.setRol(rol);
			}
			Usuario actualizado = usuarioRepository.save(existente);
			return convertirAUsuarioDTO(actualizado);
		} catch (DataIntegrityViolationException ex) {
			if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException
					&& ex.getCause().getMessage().contains("Correo_UNIQUE")) {
				throw new OperacionInvalidaException(
						"El correo proporcionado ya está registrado: " + usuarioDTO.getCorreo());
			}
			throw ex;
		}
	}

	@Override
	public void eliminarUsuario(Integer id) {
		Usuario existente = usuarioRepository.findById(id)
				.orElseThrow(() -> new ObjetoNoEncontradoException("Usuario no encontrado con id " + id));
		try {
			usuarioRepository.delete(existente);
		} catch (DataIntegrityViolationException ex) {
			Throwable causaRaiz = ex.getRootCause();
			if (causaRaiz instanceof SQLIntegrityConstraintViolationException) {
				String mensajeError = causaRaiz.getMessage();
				if (mensajeError != null && mensajeError.contains("fk_cliente_usuario")) {
					String nombreUsuario = existente.getNomUsuario() != null ? existente.getNomUsuario()
							: "con ID " + existente.getIdUsuario();
					throw new OperacionInvalidaException("No se puede eliminar al usuario '" + nombreUsuario + "'. "
							+ "Tiene mascotas asociadas en su registro de cliente.");
				}
			}
			throw ex;
		}
	}

	@Override
	public Page<UsuarioDTO> listarPaginado(int pagina, int size) {
		Pageable pageable = PageRequest.of(pagina, size);
		var page = usuarioRepository.findAll(pageable);
		var dtos = page.getContent().stream().map(this::convertirAUsuarioDTO).toList();
		return new PageImpl<>(dtos, pageable, page.getTotalElements());
	}

	@Override
	public List<UsuarioDTO> listarClientesConFiltro(String filtro) {
		// Buscar todos los usuarios con rol CLIENTE
		int rolCliente = 3;
		List<Usuario> lista = usuarioRepository.findAll().stream()
				.filter(u -> u.getRol() != null && u.getRol().getIdRol() == rolCliente).toList();
		if (filtro != null && !filtro.isBlank()) {
			String filtroLower = filtro.toLowerCase();
			lista = lista.stream().filter(u -> {
				// filtras por nombre, apellido o identificacion
				String nombreCompleto = (u.getNomUsuario() + " " + u.getApeUsuario()).toLowerCase();
				String identif = (u.getIdentificacion() == null) ? "" : u.getIdentificacion().toLowerCase();
				return nombreCompleto.contains(filtroLower) || identif.contains(filtroLower);
			}).toList();
		}

		return lista.stream().map(this::convertirAUsuarioDTO).toList();
	}

	private UsuarioDTO convertirAUsuarioDTO(Usuario usuario) {
		UsuarioDTO dto = new UsuarioDTO();
		dto.setIdUsuario(usuario.getIdUsuario());
		dto.setNombre(usuario.getNomUsuario());
		dto.setApellido(usuario.getApeUsuario());
		dto.setCorreo(usuario.getCorreo());
		dto.setIdentificacion(usuario.getIdentificacion());
		dto.setTelefono(usuario.getTelefono());
		dto.setDireccion(usuario.getDireccion());
		if (usuario.getRol() != null) {
			dto.setIdRol(usuario.getRol().getIdRol());
			dto.setNombreRol(usuario.getRol().getNomRol());
		}
		return dto;
	}

	private Usuario convertirADominio(UsuarioDTO dto, Usuario existente) {
		Usuario usuario = (existente != null) ? existente : new Usuario();
		usuario.setNomUsuario(dto.getNombre());
		usuario.setApeUsuario(dto.getApellido());
		usuario.setCorreo(dto.getCorreo());
		usuario.setClave(dto.getClave());
		usuario.setIdentificacion(dto.getIdentificacion());
		usuario.setTelefono(dto.getTelefono());
		usuario.setDireccion(dto.getDireccion());
		if (dto.getIdRol() != null) {
			Rol rol = rolRepository.findById(dto.getIdRol())
					.orElseThrow(() -> new ObjetoNoEncontradoException("Rol no encontrado con id " + dto.getIdRol()));
			usuario.setRol(rol);
		}
		return usuario;
	}

}