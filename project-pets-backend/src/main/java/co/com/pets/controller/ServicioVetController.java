package co.com.pets.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.dto.ServicioDTO;
import co.com.pets.exception.NoAutorizadoException;
import co.com.pets.service.ServicioService;
import co.com.pets.util.JwtUtil;

@RestController
@RequestMapping("/api/vet/servicios")
public class ServicioVetController {

	private final ServicioService servicioService;
	private final JwtUtil jwtUtil;

	public ServicioVetController(ServicioService servicioService, JwtUtil jwtUtil) {
		this.servicioService = servicioService;
		this.jwtUtil = jwtUtil;
	}

	@GetMapping
	public Page<ServicioDTO> listarServiciosVet(@RequestHeader("Authorization") String authHeader,
			@RequestParam(defaultValue = "0") int pagina, @RequestParam(defaultValue = "") String filtro) {
		Integer idVet = obtenerIdUsuarioDesdeToken(authHeader);
		return servicioService.listarServiciosVet(pagina, 10, idVet, filtro);
	}

	@PutMapping("/{id}/aceptar")
	public ServicioDTO aceptarServicio(@PathVariable Integer id, @RequestHeader("Authorization") String authHeader) {
		Integer idVet = obtenerIdUsuarioDesdeToken(authHeader);
		return servicioService.actualizarEstadoServicio(id, "ACEPTADO", idVet);
	}

	@PutMapping("/{id}/estado")
	public ServicioDTO actualizarEstado(@PathVariable Integer id, @RequestBody ServicioDTO dto,
			@RequestHeader("Authorization") String authHeader) {
		Integer idVet = obtenerIdUsuarioDesdeToken(authHeader);
		return servicioService.actualizarEstadoServicio(id, dto.getEstado(), idVet);
	}

	@GetMapping("/todo")
	public List<ServicioDTO> listarTodo(@RequestHeader("Authorization") String authHeader) {
		Integer idVet = obtenerIdUsuarioDesdeToken(authHeader);
		return servicioService.listarTodoPorRol("VETERINARIO", idVet);
	}

	private Integer obtenerIdUsuarioDesdeToken(String authHeader) {
		if (!authHeader.startsWith("Bearer ")) {
			throw new NoAutorizadoException(MensajesConstant.TOKEN_INVALIDO);
		}
		String token = authHeader.substring(7);
		return jwtUtil.obtenerIdUsuario(token);
	}
}
