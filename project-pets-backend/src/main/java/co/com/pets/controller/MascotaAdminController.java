package co.com.pets.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.com.pets.dto.MascotaDTO;
import co.com.pets.exception.OperacionInvalidaException;
import co.com.pets.service.MascotaService;

@RestController
@RequestMapping("/api/admin/mascotas")
public class MascotaAdminController {

	private final MascotaService mascotaService;

	public MascotaAdminController(MascotaService mascotaService) {
		this.mascotaService = mascotaService;
	}

	@GetMapping
	public Page<MascotaDTO> listarPaginado(@RequestParam(defaultValue = "0") int pagina) {
		return mascotaService.listarPaginado(pagina, 10);
	}

	@GetMapping("/todo")
	public List<MascotaDTO> listarTodo() {
		return mascotaService.listarTodo();
	}

	@PostMapping
	public MascotaDTO crear(@RequestBody MascotaDTO dto) {
		if (dto.getIdDueno() == null) {
			throw new OperacionInvalidaException("idDueno (dueño) es obligatorio para admin.");
		}
		return mascotaService.crear(dto, dto.getIdDueno());
	}

	@PutMapping("/{id}")
	public MascotaDTO actualizar(@PathVariable Integer id, @RequestBody MascotaDTO dto) {
		return mascotaService.actualizar(id, dto);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Integer id) {
		mascotaService.eliminar(id);
	}
}
