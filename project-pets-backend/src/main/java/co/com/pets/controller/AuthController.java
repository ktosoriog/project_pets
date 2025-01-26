package co.com.pets.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.dto.LoginRequestDTO;
import co.com.pets.dto.LoginResponseDTO;
import co.com.pets.dto.UsuarioDTO;
import co.com.pets.exception.NoAutorizadoException;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.service.AuthService;
import co.com.pets.service.EmailService;
import co.com.pets.service.UsuarioService;
import co.com.pets.util.JwtUtil;
import co.com.pets.util.ResetTokenStore;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Value("${frontend.url}")
	private String frontendUrl;
	private final AuthService authServicio;
	private final UsuarioService usuarioService;
	private final JwtUtil jwtUtil;
	private final EmailService emailService;

	public AuthController(AuthService authServicio, UsuarioService usuarioService, JwtUtil jwtUtil,
			EmailService emailService) {
		this.authServicio = authServicio;
		this.usuarioService = usuarioService;
		this.jwtUtil = jwtUtil;
		this.emailService = emailService;
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

	@PostMapping("/registro-cliente")
	public UsuarioDTO registroCliente(@RequestBody UsuarioDTO dto) {
		dto.setIdRol(3);
		return usuarioService.crearUsuario(dto);
	}

	@PostMapping("/solicitar-restablecer-clave")
	public String solicitarRestablecerClave(@RequestParam String correo) {
		var usuarioDTO = usuarioService.buscarPorCorreo(correo);
		String token = UUID.randomUUID().toString();
		ResetTokenStore.guardarToken(token, correo);
		String urlRestablecer = frontendUrl + "/restablecer-clave?token=" + token;
		String asunto = "Restablecimiento de contraseña";
		String contenido = "Hola " + usuarioDTO.getNombre()
				+ ",\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n" + urlRestablecer
				+ "\n\nSi no solicitaste este cambio, ignora este mensaje.";
		emailService.enviarEmail(correo, asunto, contenido);
		return "Se ha enviado un correo con las instrucciones para restablecer la contraseña.";
	}

	@PutMapping("/restablecer-clave")
	public String restablecerClave(@RequestParam String token, @RequestParam String nuevaClave) {
		String correo = ResetTokenStore.obtenerCorreoPorToken(token);
		if (correo == null) {
			return "El token es inválido o ha expirado.";
		}
		var usuarioDTO = usuarioService.buscarPorCorreo(correo);
		usuarioDTO.setClave(nuevaClave);
		usuarioService.actualizarUsuario(usuarioDTO.getIdUsuario(), usuarioDTO);
		ResetTokenStore.eliminarToken(token);
		return "Contraseña actualizada con éxito. Ya puedes iniciar sesión.";
	}

}
