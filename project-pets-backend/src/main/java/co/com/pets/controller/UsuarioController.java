package co.com.pets.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.com.pets.dto.UsuarioDTO;
import co.com.pets.service.UsuarioService;

@RestController
@RequestMapping("/api/admin/usuarios")
public class UsuarioController {

	private final UsuarioService usuarioService;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@GetMapping("/{id}")
	public UsuarioDTO buscarPorId(@PathVariable Integer id) {
		return usuarioService.buscarPorId(id);
	}

}
