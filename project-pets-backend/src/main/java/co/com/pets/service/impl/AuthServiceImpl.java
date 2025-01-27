package co.com.pets.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.dto.LoginRequestDTO;
import co.com.pets.dto.LoginResponseDTO;
import co.com.pets.entity.Usuario;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.exception.OperacionInvalidaException;
import co.com.pets.repository.UsuarioRepository;
import co.com.pets.service.AuthService;
import co.com.pets.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

	private final UsuarioRepository usuarioRepositorio;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	public AuthServiceImpl(UsuarioRepository usuarioRepositorio, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
		this.usuarioRepositorio = usuarioRepositorio;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}

	@Override
	public LoginResponseDTO login(LoginRequestDTO loginRequest) {
		Usuario usuario = usuarioRepositorio.findByCorreo(loginRequest.getCorreo());
		if (usuario == null) {
			throw new ObjetoNoEncontradoException(MensajesConstant.USUARIO_NO_ENCONTRADO_EMAIL);
		}
		if (!passwordEncoder.matches(loginRequest.getClave(), usuario.getClave())) {
			throw new OperacionInvalidaException(MensajesConstant.CLAVE_INCORRECTA);
		}

		String rol = usuario.getRol().getNomRol(); // "ADMINISTRADOR", "VETERINARIO", "CLIENTE"
		String token = jwtUtil.generarToken(usuario.getCorreo(), rol, usuario.getIdUsuario());
		return new LoginResponseDTO(token, usuario.getCorreo(), rol);
	}
}
