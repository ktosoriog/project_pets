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

import co.com.pets.dto.UsuarioDTO;
import co.com.pets.service.UsuarioService;

@RestController
@RequestMapping("/api/admin/usuarios")
public class UsuarioController {

	private final UsuarioService usuarioService;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@GetMapping("/todo")
	public List<UsuarioDTO> listarUsuarios() {
		return usuarioService.listarTodos();
	}

	@PostMapping("")
	public UsuarioDTO crearUsuario(@RequestBody UsuarioDTO usuarioDTO) {
		return usuarioService.crearUsuario(usuarioDTO);
	}

	@GetMapping("/{id}")
	public UsuarioDTO buscarPorId(@PathVariable Integer id) {
		return usuarioService.buscarPorId(id);
	}

	@PutMapping("/{id}")
	public UsuarioDTO actualizarUsuario(@PathVariable Integer id, @RequestBody UsuarioDTO usuarioDTO) {
		return usuarioService.actualizarUsuario(id, usuarioDTO);
	}

	@DeleteMapping("/{id}")
	public void eliminarUsuario(@PathVariable Integer id) {
		usuarioService.eliminarUsuario(id);
	}

	@GetMapping
	public Page<UsuarioDTO> listarPaginado(@RequestParam(defaultValue = "0") int pagina) {
		return usuarioService.listarPaginado(pagina, 10);
	}

	@GetMapping("/clientes")
	public List<UsuarioDTO> listarClientesConFiltro(@RequestParam(required = false) String filtro) {
		return usuarioService.listarClientesConFiltro(filtro);
	}

}
