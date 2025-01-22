package co.com.pets.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.dto.LoginRequestDTO;
import co.com.pets.dto.LoginResponseDTO;
import co.com.pets.dto.UsuarioDTO;
import co.com.pets.exception.NoAutorizadoException;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.service.AuthService;
import co.com.pets.service.UsuarioService;
import co.com.pets.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authServicio;
	private final UsuarioService usuarioService;
	private final JwtUtil jwtUtil;

	public AuthController(AuthService authServicio, UsuarioService usuarioService, JwtUtil jwtUtil) {
		this.authServicio = authServicio;
		this.usuarioService = usuarioService;
		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/login")
	public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
		return authServicio.login(request);
	}

	@GetMapping("/informacion-usuario")
	public UsuarioDTO informacionUsuario(@RequestHeader("Authorization") String authHeader) {
		if (!authHeader.startsWith("Bearer ")) {
			throw new NoAutorizadoException(MensajesConstant.TOKEN_INVALIDO);
		}
		String token = authHeader.substring(7);
		if (!jwtUtil.validarToken(token)) {
			throw new NoAutorizadoException(MensajesConstant.TOKEN_EXPIRADO);
		}
		String correo = jwtUtil.obtenerCorreo(token);
		UsuarioDTO usuario = usuarioService.buscarPorCorreo(correo);
		if (usuario == null) {
			throw new ObjetoNoEncontradoException(MensajesConstant.USUARIO_NO_ENCONTRADO_EMAIL);
		}
		return usuario;
	}
}
