package co.com.pets.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import co.com.pets.dto.TipoServicioDTO;
import co.com.pets.service.TipoServicioService;

@RestController
@RequestMapping("/api/admin/tipos-servicio")
public class TipoServicioController {

	private final TipoServicioService tipoServicioService;

	public TipoServicioController(TipoServicioService tipoServicioService) {
		this.tipoServicioService = tipoServicioService;
	}

	@GetMapping
	public Page<TipoServicioDTO> listarPaginado(@RequestParam(defaultValue = "0") int pagina) {
		return tipoServicioService.listarPaginado(pagina, 10);
	}

	@GetMapping("/todo")
	public List<TipoServicioDTO> listarTodo() {
		return tipoServicioService.listarTodo();
	}

	@PostMapping
	public TipoServicioDTO crear(@RequestBody TipoServicioDTO dto) {
		return tipoServicioService.crear(dto);
	}

	@PutMapping("/{id}")
	public TipoServicioDTO actualizar(@PathVariable Integer id, @RequestBody TipoServicioDTO dto) {
		return tipoServicioService.actualizar(id, dto);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Integer id) {
		tipoServicioService.eliminar(id);
	}
}
