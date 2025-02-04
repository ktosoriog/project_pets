package co.com.pets.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.dto.ServicioDTO;
import co.com.pets.exception.NoAutorizadoException;
import co.com.pets.service.ServicioService;
import co.com.pets.util.JwtUtil;

@RestController
@RequestMapping("/api/cliente/servicios")
public class ServicioClienteController {

	private final ServicioService servicioService;
	private final JwtUtil jwtUtil;

	public ServicioClienteController(ServicioService servicioService, JwtUtil jwtUtil) {
		this.servicioService = servicioService;
		this.jwtUtil = jwtUtil;
	}

	@GetMapping
	public Page<ServicioDTO> listarServiciosCliente(@RequestHeader("Authorization") String authHeader,
			@RequestParam(defaultValue = "0") int pagina, @RequestParam(defaultValue = "") String filtro) {
		Integer idUsuario = obtenerIdUsuarioDesdeToken(authHeader);
		return servicioService.listarServiciosCliente(pagina, 10, idUsuario, filtro);
	}

	@PostMapping
	public ServicioDTO crearServicioCliente(@RequestHeader("Authorization") String authHeader,
			@RequestBody ServicioDTO dto) {
		Integer idUsuario = obtenerIdUsuarioDesdeToken(authHeader);
		return servicioService.crearServicioCliente(dto, idUsuario);
	}

	@PutMapping("/{id}/cancelar")
	public ServicioDTO cancelarServicio(@PathVariable Integer id, @RequestHeader("Authorization") String authHeader) {
		// El cliente puede cancelar el servicio => estado "CANCELADO"
		return servicioService.actualizarEstadoServicio(id, "CANCELADO", null);
	}

	private Integer obtenerIdUsuarioDesdeToken(String authHeader) {
		if (!authHeader.startsWith("Bearer ")) {
			throw new NoAutorizadoException(MensajesConstant.TOKEN_INVALIDO);
		}
		String token = authHeader.substring(7);
		return jwtUtil.obtenerIdUsuario(token);
	}
}
