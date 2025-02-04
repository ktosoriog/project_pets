package co.com.pets.controller;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import co.com.pets.dto.ServicioDTO;
import co.com.pets.service.ServicioService;

@RestController
@RequestMapping("/api/admin/servicios")
public class ServicioAdminController {

	private final ServicioService servicioService;

	public ServicioAdminController(ServicioService servicioService) {
		this.servicioService = servicioService;
	}

	@GetMapping
	public Page<ServicioDTO> listarServiciosAdmin(@RequestParam(defaultValue = "0") int pagina,
			@RequestParam(defaultValue = "") String filtro) {
		return servicioService.listarServiciosAdmin(pagina, 10, filtro);
	}

	@GetMapping("/todo")
	public List<ServicioDTO> listarTodo() {
		return servicioService.listarTodoPorRol("ADMINISTRADOR", null);
	}

}
