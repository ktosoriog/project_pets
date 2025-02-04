package co.com.pets.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.com.pets.dto.TipoServicioDTO;
import co.com.pets.service.TipoServicioService;

@RestController
@RequestMapping("/api/cliente/tipos-servicio")
public class TipoServicioClienteController {

	private final TipoServicioService tipoServicioService;

	public TipoServicioClienteController(TipoServicioService tipoServicioService) {
		this.tipoServicioService = tipoServicioService;
	}

	@GetMapping("/todo")
	public List<TipoServicioDTO> listarTodo() {
		return tipoServicioService.listarTodo();
	}

}
