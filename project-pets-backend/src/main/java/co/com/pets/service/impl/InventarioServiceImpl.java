package co.com.pets.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.com.pets.dto.InventarioDTO;
import co.com.pets.entity.Inventario;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.exception.OperacionInvalidaException;
import co.com.pets.repository.InventarioRepository;
import co.com.pets.service.InventarioService;

@Service
@Transactional
public class InventarioServiceImpl implements InventarioService {

	private final InventarioRepository inventarioRepo;

	public InventarioServiceImpl(InventarioRepository inventarioRepo) {
		this.inventarioRepo = inventarioRepo;
	}

	@Override
	public Page<InventarioDTO> listarPaginado(int pagina, int size, String filtro) {
		Pageable pageable = PageRequest.of(pagina, size);
		Page<Inventario> page = inventarioRepo.findAll(pageable);
		List<Inventario> listaFiltrada = page.getContent().stream().filter(inv -> {
			if (filtro == null || filtro.trim().isEmpty())
				return true;
			String lowerFiltro = filtro.toLowerCase();
			boolean coincideCodigo = (inv.getCodigoProducto() != null)
					&& inv.getCodigoProducto().toLowerCase().contains(lowerFiltro);
			boolean coincideNombre = (inv.getNomProducto() != null)
					&& inv.getNomProducto().toLowerCase().contains(lowerFiltro);
			return coincideCodigo || coincideNombre;
		}).toList();

		List<InventarioDTO> dtos = listaFiltrada.stream().map(this::convertirADTO).toList();

		return new PageImpl<>(dtos, pageable, page.getTotalElements());
	}

	@Override
	public List<InventarioDTO> listarTodo(String filtro) {
		List<Inventario> all = inventarioRepo.findAll();
		return all.stream().filter(inv -> {
			if (filtro == null || filtro.trim().isEmpty())
				return true;
			String lowerFiltro = filtro.toLowerCase();
			boolean coincideCodigo = (inv.getCodigoProducto() != null)
					&& inv.getCodigoProducto().toLowerCase().contains(lowerFiltro);
			boolean coincideNombre = (inv.getNomProducto() != null)
					&& inv.getNomProducto().toLowerCase().contains(lowerFiltro);
			return coincideCodigo || coincideNombre;
		}).map(this::convertirADTO).toList();
	}

	@Override
	public InventarioDTO crear(InventarioDTO dto) {
		try {
			Inventario inv = new Inventario();
			inv.setCodigoProducto(dto.getCodigoProducto());
			inv.setNomProducto(dto.getNomProducto());
			inv.setPrecioUnitario(dto.getPrecioUnitario());
			inv.setDescripcion(dto.getDescripcion());
			inv.setCanDisponible(dto.getCanDisponible());
			inv.setIngreso(dto.getIngreso() != null ? dto.getIngreso() : new Date());
			inv.setSalida(dto.getSalida() != null ? dto.getSalida() : new Date());
			inv.setStopMin(dto.getStopMin());
			Inventario guardado = inventarioRepo.save(inv);
			return convertirADTO(guardado);
		} catch (DataIntegrityViolationException ex) {
			if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException
					&& ex.getCause().getMessage().contains("CodigoProducto_UNIQUE")) {
				throw new OperacionInvalidaException(
						"El codigo de producto proporcionado ya está registrado: " + dto.getCodigoProducto());
			}
			throw ex;
		}
	}

	@Override
	public InventarioDTO actualizar(Integer idInventario, InventarioDTO dto) {
		try {
			Inventario existente = inventarioRepo.findById(idInventario).orElseThrow(
					() -> new ObjetoNoEncontradoException("No se encontró inventario con ID " + idInventario));
			existente.setCodigoProducto(dto.getCodigoProducto());
			existente.setNomProducto(dto.getNomProducto());
			existente.setPrecioUnitario(dto.getPrecioUnitario());
			existente.setDescripcion(dto.getDescripcion());
			existente.setCanDisponible(dto.getCanDisponible());
			existente.setSalida(new Date());
			existente.setStopMin(dto.getStopMin());
			Inventario actualizado = inventarioRepo.save(existente);
			return convertirADTO(actualizado);
		} catch (DataIntegrityViolationException ex) {
			if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException
					&& ex.getCause().getMessage().contains("CodigoProducto_UNIQUE")) {
				throw new OperacionInvalidaException(
						"El codigo de producto proporcionado ya está registrado: " + dto.getCodigoProducto());
			}
			throw ex;
		}
	}

	@Override
	public void eliminar(Integer idInventario) {
		Inventario inv = inventarioRepo.findById(idInventario)
				.orElseThrow(() -> new ObjetoNoEncontradoException("No se encontró inventario con ID " + idInventario));
		inventarioRepo.delete(inv);
	}

	@Override
	public InventarioDTO buscarPorId(Integer idInventario) {
		Inventario inv = inventarioRepo.findById(idInventario)
				.orElseThrow(() -> new ObjetoNoEncontradoException("No se encontró inventario con ID " + idInventario));
		return convertirADTO(inv);
	}

	private InventarioDTO convertirADTO(Inventario inv) {
		InventarioDTO dto = new InventarioDTO();
		dto.setIdInventario(inv.getIdInventario());
		dto.setCodigoProducto(inv.getCodigoProducto());
		dto.setNomProducto(inv.getNomProducto());
		dto.setPrecioUnitario(inv.getPrecioUnitario());
		dto.setDescripcion(inv.getDescripcion());
		dto.setCanDisponible(inv.getCanDisponible());
		dto.setIngreso(inv.getIngreso());
		dto.setSalida(inv.getSalida());
		dto.setStopMin(inv.getStopMin());
		return dto;
	}
}
