package co.com.pets.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import co.com.pets.dto.EspecieDTO;
import co.com.pets.dto.RazaDTO;
import co.com.pets.service.EspecieService;
import co.com.pets.service.RazaService;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/catalogo")
public class CatalogoController {

	private final EspecieService especieService;
	private final RazaService razaService;

	public CatalogoController(EspecieService especieService, RazaService razaService) {
		this.especieService = especieService;
		this.razaService = razaService;
	}

	@GetMapping("/especies")
	public List<EspecieDTO> listarEspecies() {
		return especieService.listarTodo();
	}

	@GetMapping("/razas")
	public List<RazaDTO> listarRazasPorEspecie(@RequestParam Integer idEspecie) {
		return razaService.listarPorEspecie(idEspecie);
	}
}
