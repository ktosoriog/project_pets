package co.com.pets.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.com.pets.dto.MascotaDTO;
import co.com.pets.entity.Cliente;
import co.com.pets.entity.Mascota;
import co.com.pets.entity.Raza;
import co.com.pets.entity.Usuario;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.repository.ClienteRepository;
import co.com.pets.repository.MascotaRepository;
import co.com.pets.repository.RazaRepository;
import co.com.pets.repository.UsuarioRepository;
import co.com.pets.service.MascotaService;

@Service
@Transactional
public class MascotaServiceImpl implements MascotaService {

	private final MascotaRepository mascotaRepo;
	private final RazaRepository razaRepo;
	private final ClienteRepository clienteRepo;
	private final UsuarioRepository usuarioRepo;

	public MascotaServiceImpl(MascotaRepository mascotaRepo, RazaRepository razaRepo, ClienteRepository clienteRepo,
			UsuarioRepository usuarioRepo) {
		this.mascotaRepo = mascotaRepo;
		this.razaRepo = razaRepo;
		this.clienteRepo = clienteRepo;
		this.usuarioRepo = usuarioRepo;
	}

	@Override
	public Page<MascotaDTO> listarPaginado(int pagina, int size, String filtro) {
		Pageable pageable = PageRequest.of(pagina, size);
		Page<Mascota> page = mascotaRepo.findAll(pageable);
		List<Mascota> listaFiltrada = page.getContent().stream().filter(m -> {
			if (filtro == null || filtro.trim().isEmpty())
				return true;
			String lowerFiltro = filtro.toLowerCase();
			boolean coincideNombre = (m.getNomMascota() != null)
					&& m.getNomMascota().toLowerCase().contains(lowerFiltro);
			boolean coincideEspecie = (m.getRaza().getEspecie() != null)
					&& m.getRaza().getEspecie().getNomEspecie().toLowerCase().contains(lowerFiltro);
			boolean coincideRaza = (m.getRaza() != null)
					&& m.getRaza().getNomRaza().toLowerCase().contains(lowerFiltro);
			return coincideNombre || coincideEspecie || coincideRaza;
		}).toList();
		List<MascotaDTO> dtos = listaFiltrada.stream().map(this::convertirADTO).toList();
		return new PageImpl<>(dtos, pageable, page.getTotalElements());
	}

	@Override
	public List<MascotaDTO> listarTodo() {
		return mascotaRepo.findAll().stream().map(this::convertirADTO).toList();
	}

	@Override
	public MascotaDTO crear(MascotaDTO mascotaDTO, Integer idUsuarioDueno) {
		// 1) Obtener la Raza
		Raza raza = razaRepo.findById(mascotaDTO.getIdRaza()).orElseThrow(
				() -> new ObjetoNoEncontradoException("Raza no encontrada con id " + mascotaDTO.getIdRaza()));
		// 2) Crear la Mascota
		Mascota m = new Mascota();
		m.setNomMascota(mascotaDTO.getNombre());
		m.setFechaNacimiento(mascotaDTO.getFechaNacimiento());
		m.setRaza(raza);
		Mascota guardada = mascotaRepo.save(m);
		// 3) Asociar la Mascota a un "dueño" en la tabla Cliente
		Usuario usuarioDueno = usuarioRepo.findById(idUsuarioDueno)
				.orElseThrow(() -> new ObjetoNoEncontradoException("Usuario no encontrado con id " + idUsuarioDueno));
		Cliente c = new Cliente();
		c.setUsuario(usuarioDueno);
		c.setMascota(guardada);
		clienteRepo.save(c);
		return convertirADTO(guardada);
	}

	@Override
	public MascotaDTO actualizar(Integer id, MascotaDTO mascotaDTO) {
		Mascota existente = mascotaRepo.findById(id)
				.orElseThrow(() -> new ObjetoNoEncontradoException("Mascota no encontrada con id " + id));
		Raza raza = razaRepo.findById(mascotaDTO.getIdRaza()).orElseThrow(
				() -> new ObjetoNoEncontradoException("Raza no encontrada con id " + mascotaDTO.getIdRaza()));
		existente.setNomMascota(mascotaDTO.getNombre());
		existente.setFechaNacimiento(mascotaDTO.getFechaNacimiento());
		existente.setRaza(raza);
		Mascota actualizada = mascotaRepo.save(existente);
		return convertirADTO(actualizada);
	}

	@Override
	public void eliminar(Integer id) {
		Mascota existente = mascotaRepo.findById(id)
				.orElseThrow(() -> new ObjetoNoEncontradoException("Mascota no encontrada con id " + id));
		// Eliminar la asociación en "cliente"
		List<Cliente> clientes = clienteRepo.findAll().stream().filter(c -> c.getMascota().getIdMascota().equals(id))
				.toList();
		clienteRepo.deleteAll(clientes);
		mascotaRepo.delete(existente);
	}

	@Override
	public Page<MascotaDTO> listarPaginadoPorUsuario(int pagina, int size, Integer idUsuario, String filtro) {
		// 1) Buscar en "cliente" las mascotas para idUsuario
		List<Cliente> listaCliente = clienteRepo.findAll().stream()
				.filter(c -> c.getUsuario().getIdUsuario().equals(idUsuario)).toList();
		List<Mascota> mascotas = listaCliente.stream().map(Cliente::getMascota).toList();
		List<Mascota> listaFiltrada = mascotas.stream().filter(m -> {
			if (filtro == null || filtro.trim().isEmpty())
				return true;
			String lowerFiltro = filtro.toLowerCase();
			boolean coincideNombre = (m.getNomMascota() != null)
					&& m.getNomMascota().toLowerCase().contains(lowerFiltro);
			boolean coincideEspecie = (m.getRaza().getEspecie() != null)
					&& m.getRaza().getEspecie().getNomEspecie().toLowerCase().contains(lowerFiltro);
			boolean coincideRaza = (m.getRaza() != null)
					&& m.getRaza().getNomRaza().toLowerCase().contains(lowerFiltro);
			return coincideNombre || coincideEspecie || coincideRaza;
		}).toList();
		int start = pagina * size;
		int end = Math.min(start + size, listaFiltrada.size());
		List<Mascota> subList = listaFiltrada.subList(start, end);
		List<MascotaDTO> dtos = subList.stream().map(this::convertirADTO).toList();
		return new PageImpl<>(dtos, PageRequest.of(pagina, size), listaFiltrada.size());
	}

	@Override
	public List<MascotaDTO> listarTodoPorUsuario(Integer idUsuario) {
		List<Cliente> listaCliente = clienteRepo.findAll().stream()
				.filter(c -> c.getUsuario().getIdUsuario().equals(idUsuario)).toList();
		return listaCliente.stream().map(cl -> convertirADTO(cl.getMascota())).toList();
	}

	private MascotaDTO convertirADTO(Mascota m) {
		MascotaDTO dto = new MascotaDTO();
		dto.setIdMascota(m.getIdMascota());
		dto.setNombre(m.getNomMascota());
		dto.setFechaNacimiento(m.getFechaNacimiento());
		dto.setIdRaza(m.getRaza().getIdRaza());
		dto.setNomRaza(m.getRaza().getNomRaza());
		if (m.getRaza().getEspecie() != null) {
			dto.setIdEspecie(m.getRaza().getEspecie().getIdEspecie());
			dto.setNomEspecie(m.getRaza().getEspecie().getNomEspecie());
		}
		// Encontrar el registro "cliente" para esta mascota
		List<Cliente> listaC = clienteRepo.findAll().stream()
				.filter(c -> c.getMascota().getIdMascota().equals(m.getIdMascota())).toList();
		if (!listaC.isEmpty()) {
			Cliente c = listaC.get(0);
			var usuario = c.getUsuario();
			dto.setIdDueno(usuario.getIdUsuario());
			dto.setNombreDueno(usuario.getNomUsuario() + " " + usuario.getApeUsuario());
			dto.setIdentificacionDueno(usuario.getIdentificacion());
		}
		return dto;
	}
}
