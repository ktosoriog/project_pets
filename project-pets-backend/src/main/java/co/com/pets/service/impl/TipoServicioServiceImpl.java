package co.com.pets.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import co.com.pets.dto.TipoServicioDTO;
import co.com.pets.entity.TipoServicio;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.exception.OperacionInvalidaException;
import co.com.pets.repository.TipoServicioRepository;
import co.com.pets.service.TipoServicioService;

@Service
public class TipoServicioServiceImpl implements TipoServicioService {

	private final TipoServicioRepository tipoServicioRepo;

	public TipoServicioServiceImpl(TipoServicioRepository tipoServicioRepo) {
		this.tipoServicioRepo = tipoServicioRepo;
	}

	@Override
	public List<TipoServicioDTO> listarTodo() {
		return tipoServicioRepo.findAll().stream().map(this::convertirADTO).toList();
	}

	@Override
	public Page<TipoServicioDTO> listarPaginado(int pagina, int size) {
		Pageable pageable = PageRequest.of(pagina, size);
		var page = tipoServicioRepo.findAll(pageable);
		var dtos = page.getContent().stream().map(this::convertirADTO).toList();
		return new PageImpl<>(dtos, pageable, page.getTotalElements());
	}

	@Override
	public TipoServicioDTO crear(TipoServicioDTO dto) {
		if (dto.getNombre() == null || dto.getNombre().isBlank() || dto.getPrecio() == null
				|| dto.getDescripcion() == null || dto.getDescripcion().isBlank()) {
			throw new OperacionInvalidaException("Todos los campos son obligatorios");
		}

		TipoServicio ts = convertirAEntidad(dto, null);
		var guardado = tipoServicioRepo.save(ts);
		return convertirADTO(guardado);
	}

	@Override
	public TipoServicioDTO actualizar(Integer id, TipoServicioDTO dto) {
		var existente = tipoServicioRepo.findById(id)
				.orElseThrow(() -> new ObjetoNoEncontradoException("TipoServicio no encontrado con id: " + id));

		// Validar campos obligatorios
		if (dto.getNombre() == null || dto.getNombre().isBlank() || dto.getPrecio() == null
				|| dto.getDescripcion() == null || dto.getDescripcion().isBlank()) {
			throw new OperacionInvalidaException("Todos los campos son obligatorios");
		}

		TipoServicio ts = convertirAEntidad(dto, existente);
		var guardado = tipoServicioRepo.save(ts);
		return convertirADTO(guardado);
	}

	@Override
	public void eliminar(Integer id) {
		var existente = tipoServicioRepo.findById(id)
				.orElseThrow(() -> new ObjetoNoEncontradoException("TipoServicio no encontrado con id: " + id));
		tipoServicioRepo.delete(existente);
	}

	// Métodos privados de mapeo
	private TipoServicioDTO convertirADTO(TipoServicio ts) {
		TipoServicioDTO dto = new TipoServicioDTO();
		dto.setIdTipoServ(ts.getIdTipoServ());
		dto.setNombre(ts.getNombreServ());
		dto.setPrecio(ts.getPrecio());
		dto.setDescripcion(ts.getDescripcion());
		return dto;
	}

	private TipoServicio convertirAEntidad(TipoServicioDTO dto, TipoServicio existente) {
		TipoServicio ts = (existente != null) ? existente : new TipoServicio();
		ts.setNombreServ(dto.getNombre());
		ts.setPrecio(dto.getPrecio());
		ts.setDescripcion(dto.getDescripcion());
		return ts;
	}
}
