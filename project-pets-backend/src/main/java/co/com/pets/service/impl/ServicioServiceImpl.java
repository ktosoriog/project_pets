package co.com.pets.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.com.pets.dto.ServicioDTO;
import co.com.pets.entity.Mascota;
import co.com.pets.entity.Servicio;
import co.com.pets.entity.TipoServicio;
import co.com.pets.entity.Usuario;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.repository.MascotaRepository;
import co.com.pets.repository.ServicioRepository;
import co.com.pets.repository.TipoServicioRepository;
import co.com.pets.repository.UsuarioRepository;
import co.com.pets.service.EmailService;
import co.com.pets.service.ServicioService;

@Service
@Transactional
public class ServicioServiceImpl implements ServicioService {

	private final ServicioRepository servicioRepo;
	private final MascotaRepository mascotaRepo;
	private final UsuarioRepository usuarioRepo;
	private final TipoServicioRepository tipoServicioRepo;
	private final EmailService emailService;

	public ServicioServiceImpl(ServicioRepository servicioRepo, MascotaRepository mascotaRepo,
			UsuarioRepository usuarioRepo, TipoServicioRepository tipoServicioRepo, EmailService emailService) {
		this.servicioRepo = servicioRepo;
		this.mascotaRepo = mascotaRepo;
		this.usuarioRepo = usuarioRepo;
		this.tipoServicioRepo = tipoServicioRepo;
		this.emailService = emailService;
	}

	@Override
	public ServicioDTO crearServicioCliente(ServicioDTO dto, Integer idCliente) {
		// 1) Buscar la mascota
		Mascota mascota = mascotaRepo.findById(dto.getIdMascota()).orElseThrow(
				() -> new ObjetoNoEncontradoException("Mascota no encontrada con id " + dto.getIdMascota()));
		// 2) Buscar el tipo de servicio
		TipoServicio tipo = tipoServicioRepo.findById(dto.getIdTipoServ()).orElseThrow(
				() -> new ObjetoNoEncontradoException("Tipo de servicio no encontrado con id " + dto.getIdTipoServ()));

		// 3) El usuario cliente
		Usuario userCliente = usuarioRepo.findById(idCliente)
				.orElseThrow(() -> new ObjetoNoEncontradoException("Cliente no encontrado con id " + idCliente));

		// 4) Crear entidad
		Servicio s = new Servicio();
		s.setFechaServ(dto.getFechaServ());
		s.setHoraServicio(dto.getHoraServicio()); // "08:00"
		s.setEstado("PENDIENTE"); // por defecto
		s.setMascota(mascota);
		s.setCliente(userCliente);
		s.setVet(null); // se asignará luego
		s.setTipoServicio(tipo);
		s.setDescription(dto.getDescription());

		Servicio guardado = servicioRepo.save(s);
		return convertirADTO(guardado);
	}

	@Override
	public Page<ServicioDTO> listarServiciosCliente(int pagina, int size, Integer idCliente, String filtro) {
		Pageable pageable = PageRequest.of(pagina, size, Sort.by("fechaServ").descending());
		Page<Servicio> page = servicioRepo.findAll(pageable);
		List<Servicio> filtrados = page.getContent().stream().filter(s -> {
			if (s.getCliente() == null || !s.getCliente().getIdUsuario().equals(idCliente))
				return false;
			if (filtro == null || filtro.isBlank())
				return true;
			String low = filtro.toLowerCase();
			// nombre de la mascota
			boolean matchMascota = (s.getMascota() != null
					&& s.getMascota().getNomMascota().toLowerCase().contains(low));
			// nombre del servicio
			boolean matchTipo = (s.getTipoServicio() != null
					&& s.getTipoServicio().getNombreServ().toLowerCase().contains(low));
			// nombre del vet
			boolean matchVet = (s.getVet() != null
					&& (s.getVet().getNomUsuario() + " " + s.getVet().getApeUsuario()).toLowerCase().contains(low));
			return matchMascota || matchTipo || matchVet;
		}).collect(Collectors.toList());

		List<ServicioDTO> dtos = filtrados.stream().map(this::convertirADTO).collect(Collectors.toList());
		return new PageImpl<>(dtos, pageable, page.getTotalElements());
	}

	@Override
	public Page<ServicioDTO> listarServiciosVet(int pagina, int size, Integer idVet, String filtro) {
		Pageable pageable = PageRequest.of(pagina, size, Sort.by("fechaServ").descending());
		Page<Servicio> page = servicioRepo.findAll(pageable);
		List<Servicio> filtrados = page.getContent().stream().filter(s -> {
			boolean esPendiente = "PENDIENTE".equalsIgnoreCase(s.getEstado());
			boolean vetAsociado = (s.getVet() != null && s.getVet().getIdUsuario().equals(idVet));
			if (!esPendiente && !vetAsociado) {
				return false;
			}
			if (filtro == null || filtro.isBlank()) {
				return true;
			}
			String low = filtro.toLowerCase();
			boolean matchCliente = (s.getCliente() != null
					&& ((s.getCliente().getNomUsuario() + " " + s.getCliente().getApeUsuario()).toLowerCase()
							.contains(low)
							|| (s.getCliente().getIdentificacion() != null
									&& s.getCliente().getIdentificacion().toLowerCase().contains(low))));
			boolean matchMascota = (s.getMascota() != null
					&& s.getMascota().getNomMascota().toLowerCase().contains(low));
			boolean matchTipo = (s.getTipoServicio() != null
					&& s.getTipoServicio().getNombreServ().toLowerCase().contains(low));

			return matchCliente || matchMascota || matchTipo;
		}).collect(Collectors.toList());
		List<ServicioDTO> dtos = filtrados.stream().map(this::convertirADTO).collect(Collectors.toList());
		return new PageImpl<>(dtos, pageable, page.getTotalElements());
	}

	@Override
	public Page<ServicioDTO> listarServiciosAdmin(int pagina, int size, String filtro) {
		Pageable pageable = PageRequest.of(pagina, size, Sort.by("fechaServ").descending());
		Page<Servicio> page = servicioRepo.findAll(pageable);
		List<Servicio> filtrados = page.getContent().stream().filter(s -> {
			if (filtro == null || filtro.isBlank())
				return true;
			String low = filtro.toLowerCase();
			// filtrar por nombre cliente, mascota, vet, etc.
			boolean matchCliente = (s.getCliente() != null
					&& (s.getCliente().getNomUsuario() + " " + s.getCliente().getApeUsuario()).toLowerCase()
							.contains(low));
			boolean matchMascota = (s.getMascota() != null
					&& s.getMascota().getNomMascota().toLowerCase().contains(low));
			boolean matchTipo = (s.getTipoServicio() != null
					&& s.getTipoServicio().getNombreServ().toLowerCase().contains(low));
			boolean matchVet = (s.getVet() != null
					&& (s.getVet().getNomUsuario() + " " + s.getVet().getApeUsuario()).toLowerCase().contains(low));
			return matchCliente || matchMascota || matchTipo || matchVet;
		}).collect(Collectors.toList());
		List<ServicioDTO> dtos = filtrados.stream().map(this::convertirADTO).collect(Collectors.toList());
		return new PageImpl<>(dtos, pageable, page.getTotalElements());
	}

	@Override
	public ServicioDTO actualizarEstadoServicio(Integer idServicio, String nuevoEstado, Integer idVet) {
		Servicio s = servicioRepo.findById(idServicio)
				.orElseThrow(() -> new ObjetoNoEncontradoException("No se encontró el servicio con id " + idServicio));
		s.setEstado(nuevoEstado.toUpperCase());
		if ("ACEPTADO".equalsIgnoreCase(nuevoEstado)) {
			if (s.getVet() == null) {
				Usuario vet = usuarioRepo.findById(idVet).orElseThrow(
						() -> new ObjetoNoEncontradoException("Veterinario no encontrado con id " + idVet));
				s.setVet(vet);
			}
			// Enviar email al cliente notificando la asignación del veterinario
			if (s.getCliente() != null && s.getCliente().getCorreo() != null) {
				String correoCliente = s.getCliente().getCorreo();
				String asunto = "Servicio ACEPTADO";
				String contenido = String.format(
						"Hola %s,\n\nEl veterinario %s ha aceptado tu servicio: %s.\nFecha: %s, Hora: %s\n\n¡Gracias por usar nuestros servicios!",
						s.getCliente().getNomUsuario(),
						(s.getVet() != null ? (s.getVet().getNomUsuario() + " " + s.getVet().getApeUsuario())
								: "un veterinario"),
						(s.getTipoServicio() != null ? s.getTipoServicio().getNombreServ() : "Servicio"),
						s.getFechaServ(), s.getHoraServicio() == null ? "" : s.getHoraServicio());
				emailService.enviarEmail(correoCliente, asunto, contenido);
			}
		}
		Servicio actualizado = servicioRepo.save(s);
		return convertirADTO(actualizado);
	}

	@Override
	public ServicioDTO editarServicio(Integer idServicio, ServicioDTO dto) {
		Servicio s = servicioRepo.findById(idServicio)
				.orElseThrow(() -> new ObjetoNoEncontradoException("No se encontró el servicio con id " + idServicio));
		s.setEstado(dto.getEstado());
		s.setDescription(dto.getDescription());
		return convertirADTO(servicioRepo.save(s));
	}

	@Override
	public List<ServicioDTO> listarTodoPorRol(String rol, Integer idUsuario) {
		List<Servicio> todos = servicioRepo.findAll();
		return todos.stream().filter(s -> {
			switch (rol) {
			case "ADMINISTRADOR":
				return true;
			case "VETERINARIO":
				return s.getVet() != null && s.getVet().getIdUsuario().equals(idUsuario);
			case "CLIENTE":
				return s.getCliente() != null && s.getCliente().getIdUsuario().equals(idUsuario);
			default:
				return false;
			}
		}).map(this::convertirADTO).collect(Collectors.toList());
	}

	private ServicioDTO convertirADTO(Servicio s) {
		ServicioDTO dto = new ServicioDTO();
		dto.setIdServicio(s.getIdServicio());
		dto.setFechaServ(s.getFechaServ());
		dto.setHoraServicio(s.getHoraServicio());
		dto.setEstado(s.getEstado());

		if (s.getMascota() != null) {
			dto.setIdMascota(s.getMascota().getIdMascota());
			dto.setNomMascota(s.getMascota().getNomMascota());
		}
		if (s.getCliente() != null) {
			dto.setIdCliente(s.getCliente().getIdUsuario());
			dto.setNomCliente(s.getCliente().getNomUsuario());
			dto.setApeCliente(s.getCliente().getApeUsuario());
			dto.setIdentCliente(s.getCliente().getIdentificacion());
		}
		if (s.getVet() != null) {
			dto.setIdVet(s.getVet().getIdUsuario());
			dto.setNomVet(s.getVet().getNomUsuario());
			dto.setApeVet(s.getVet().getApeUsuario());
		}
		if (s.getTipoServicio() != null) {
			dto.setIdTipoServ(s.getTipoServicio().getIdTipoServ());
			dto.setNomTipoServ(s.getTipoServicio().getNombreServ());
			dto.setPrecioServ(s.getTipoServicio().getPrecio());
		}
		dto.setDescription(s.getDescription());
		return dto;
	}
}
