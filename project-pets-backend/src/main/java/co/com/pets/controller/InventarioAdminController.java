package co.com.pets.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import co.com.pets.dto.InventarioDTO;
import co.com.pets.service.InventarioService;

@RestController
@RequestMapping("/api/admin/inventario")
public class InventarioAdminController {

	private final InventarioService inventarioService;

	public InventarioAdminController(InventarioService inventarioService) {
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

	@PostMapping
	public InventarioDTO crear(@RequestBody InventarioDTO dto) {
		return inventarioService.crear(dto);
	}

	@PutMapping("/{id}")
	public InventarioDTO actualizar(@PathVariable Integer id, @RequestBody InventarioDTO dto) {
		return inventarioService.actualizar(id, dto);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Integer id) {
		inventarioService.eliminar(id);
	}

	@GetMapping("/{id}")
	public InventarioDTO buscarPorId(@PathVariable Integer id) {
		return inventarioService.buscarPorId(id);
	}
}
