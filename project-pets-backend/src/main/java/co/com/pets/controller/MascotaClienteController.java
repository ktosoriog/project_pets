package co.com.pets.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.com.pets.constant.MensajesConstant;
import co.com.pets.dto.MascotaDTO;
import co.com.pets.exception.NoAutorizadoException;
import co.com.pets.service.MascotaService;
import co.com.pets.util.JwtUtil;

@RestController
@RequestMapping("/api/cliente/mascotas")
public class MascotaClienteController {

	private final MascotaService mascotaService;
	private final JwtUtil jwtUtil;

	public MascotaClienteController(MascotaService mascotaService, JwtUtil jwtUtil) {
		this.mascotaService = mascotaService;
		this.jwtUtil = jwtUtil;
	}

	@GetMapping
	public Page<MascotaDTO> listarPaginado(@RequestHeader("Authorization") String authHeader,
			@RequestParam(defaultValue = "0") int pagina, @RequestParam(defaultValue = "") String filtro) {
		Integer idUsuario = obtenerIdUsuarioDesdeToken(authHeader);
		return mascotaService.listarPaginadoPorUsuario(pagina, 10, idUsuario, filtro);
	}

	@GetMapping("/todo")
	public List<MascotaDTO> listarTodo(@RequestHeader("Authorization") String authHeader) {
		Integer idUsuario = obtenerIdUsuarioDesdeToken(authHeader);
		return mascotaService.listarTodoPorUsuario(idUsuario);
	}

	@PostMapping
	public MascotaDTO crear(@RequestHeader("Authorization") String authHeader, @RequestBody MascotaDTO dto) {
		Integer idUsuario = obtenerIdUsuarioDesdeToken(authHeader);
		return mascotaService.crear(dto, idUsuario);
	}

	@PutMapping("/{id}")
	public MascotaDTO actualizar(@PathVariable Integer id, @RequestBody MascotaDTO dto) {
		return mascotaService.actualizar(id, dto);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Integer id) {
		mascotaService.eliminar(id);
	}

	private Integer obtenerIdUsuarioDesdeToken(String authHeader) {
		if (!authHeader.startsWith("Bearer ")) {
			throw new NoAutorizadoException(MensajesConstant.TOKEN_INVALIDO);
		}
		String token = authHeader.substring(7);
		return jwtUtil.obtenerIdUsuario(token);
	}
}
