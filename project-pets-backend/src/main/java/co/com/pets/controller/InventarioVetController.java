package co.com.pets.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import co.com.pets.dto.InventarioDTO;
import co.com.pets.service.InventarioService;

@RestController
@RequestMapping("/api/vet/inventario")
public class InventarioVetController {

	private final InventarioService inventarioService;

	public InventarioVetController(InventarioService inventarioService) {
		this.inventarioService = inventarioService;
	}

	@GetMapping
	public Page<InventarioDTO> listarPaginado(@RequestParam(defaultValue = "0") int pagina,
			@RequestParam(defaultValue = "") String filtro) {
		return inventarioService.listarPaginado(pagina, 10, filtro);
	}

	@GetMapping("/todo")
	public List<InventarioDTO> listarTodo(@RequestParam(defaultValue = "") String filtro) {
		return inventarioService.listarTodo(filtro);
	}

	@GetMapping("/{id}")
	public InventarioDTO buscarPorId(@PathVariable Integer id) {
		return inventarioService.buscarPorId(id);
	}

}
