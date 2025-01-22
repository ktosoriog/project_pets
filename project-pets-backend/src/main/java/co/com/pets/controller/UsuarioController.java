package co.com.pets.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	@GetMapping
	public List<UsuarioDTO> listar() {
		return usuarioService.listarUsuarios();
	}

	@GetMapping("/{id}")
	public UsuarioDTO buscarPorId(@PathVariable Integer id) {
		return usuarioService.buscarPorId(id);
	}

	@PostMapping
	public UsuarioDTO crear(@RequestBody UsuarioDTO usuarioDTO) {
		return usuarioService.crearUsuario(usuarioDTO);
	}

	@PutMapping("/{id}")
	public UsuarioDTO actualizar(@PathVariable Integer id, @RequestBody UsuarioDTO usuarioDTO) {
		return usuarioService.actualizarUsuario(id, usuarioDTO);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Integer id) {
		usuarioService.eliminarUsuario(id);
	}

}
