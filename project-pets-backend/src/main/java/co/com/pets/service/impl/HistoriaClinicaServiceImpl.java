package co.com.pets.service.impl;

import java.util.Date;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.com.pets.dto.HistoriaClinicaDTO;
import co.com.pets.entity.HistoriaClinica;
import co.com.pets.entity.Servicio;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.repository.HistoriaClinicaRepository;
import co.com.pets.repository.ServicioRepository;
import co.com.pets.service.HistoriaClinicaService;

@Service
@Transactional
public class HistoriaClinicaServiceImpl implements HistoriaClinicaService {

	private final HistoriaClinicaRepository historiaRepo;
	private final ServicioRepository servicioRepo;

	public HistoriaClinicaServiceImpl(HistoriaClinicaRepository historiaRepo, ServicioRepository servicioRepo) {
		this.historiaRepo = historiaRepo;
		this.servicioRepo = servicioRepo;
	}

	@Override
	public Page<HistoriaClinicaDTO> listarPorServicio(Integer idServicio, int pagina, int size) {
		Pageable pageable = PageRequest.of(pagina, size, Sort.by("idHistoria").descending());
		Page<HistoriaClinica> page = historiaRepo.findAll(pageable);
		var filtradas = page.getContent().stream().filter(h -> h.getServicio().getIdServicio().equals(idServicio))
				.toList();
		var dtos = filtradas.stream().map(this::convertirADTO).toList();
		return new PageImpl<>(dtos, pageable, page.getTotalElements());
	}

	@Override
	public HistoriaClinicaDTO crearHistoria(HistoriaClinicaDTO dto, Integer idServicio) {
		Servicio s = servicioRepo.findById(idServicio)
				.orElseThrow(() -> new ObjetoNoEncontradoException("Servicio no encontrado con id " + idServicio));
		HistoriaClinica h = new HistoriaClinica();
		h.setServicio(s);
		h.setFechaServ(new Date());
		h.setDetalle(dto.getDetalle());
		HistoriaClinica guardada = historiaRepo.save(h);
		return convertirADTO(guardada);
	}

	@Override
	public HistoriaClinicaDTO editarHistoria(Integer idHistoria, HistoriaClinicaDTO dto) {
		HistoriaClinica h = historiaRepo.findById(idHistoria)
				.orElseThrow(() -> new ObjetoNoEncontradoException("Historia no encontrada con id " + idHistoria));
		h.setDetalle(dto.getDetalle());
		return convertirADTO(historiaRepo.save(h));
	}

	@Override
	public void eliminarHistoria(Integer idHistoria) {
		HistoriaClinica h = historiaRepo.findById(idHistoria)
				.orElseThrow(() -> new ObjetoNoEncontradoException("Historia no encontrada con id " + idHistoria));
		historiaRepo.delete(h);
	}

	private HistoriaClinicaDTO convertirADTO(HistoriaClinica h) {
		HistoriaClinicaDTO dto = new HistoriaClinicaDTO();
		dto.setIdHistoria(h.getIdHistoria());
		dto.setIdServicio(h.getServicio().getIdServicio());
		dto.setFechaServ(h.getFechaServ());
		dto.setDetalle(h.getDetalle());
		return dto;
	}
}
