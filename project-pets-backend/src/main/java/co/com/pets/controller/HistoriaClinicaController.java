package co.com.pets.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import co.com.pets.dto.HistoriaClinicaDTO;
import co.com.pets.service.HistoriaClinicaService;

@RestController
@RequestMapping("/api/historia")
public class HistoriaClinicaController {

	private final HistoriaClinicaService historiaService;

	public HistoriaClinicaController(HistoriaClinicaService historiaService) {
		this.historiaService = historiaService;
	}

	@GetMapping("/{idServicio}")
	public Page<HistoriaClinicaDTO> listarPorServicio(@PathVariable Integer idServicio,
			@RequestParam(defaultValue = "0") int pagina) {
		return historiaService.listarPorServicio(idServicio, pagina, 10);
	}

	@PostMapping("/{idServicio}")
	public HistoriaClinicaDTO crearHistoria(@PathVariable Integer idServicio, @RequestBody HistoriaClinicaDTO dto) {
		return historiaService.crearHistoria(dto, idServicio);
	}

	@PutMapping("/{idHistoria}")
	public HistoriaClinicaDTO editarHistoria(@PathVariable Integer idHistoria, @RequestBody HistoriaClinicaDTO dto) {
		return historiaService.editarHistoria(idHistoria, dto);
	}

	@DeleteMapping("/{idHistoria}")
	public void eliminarHistoria(@PathVariable Integer idHistoria) {
		historiaService.eliminarHistoria(idHistoria);
	}
}
