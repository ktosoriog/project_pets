package co.com.pets.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import co.com.pets.dto.RazaDTO;
import co.com.pets.entity.Raza;
import co.com.pets.exception.ObjetoNoEncontradoException;
import co.com.pets.repository.RazaRepository;
import co.com.pets.service.RazaService;

@Service
public class RazaServiceImpl implements RazaService {

	private final RazaRepository razaRepository;

	public RazaServiceImpl(RazaRepository razaRepository) {
		this.razaRepository = razaRepository;
	}

	@Override
	public List<RazaDTO> listarPorEspecie(Integer idEspecie) {
		if (idEspecie == null) {
			throw new ObjetoNoEncontradoException("idEspecie no puede ser nulo");
		}
		List<Raza> lista = razaRepository.findByEspecie_IdEspecie(idEspecie);
		return lista.stream().map(this::convertirDto).toList();
	}

	private RazaDTO convertirDto(Raza r) {
		RazaDTO dto = new RazaDTO();
		dto.setIdRaza(r.getIdRaza());
		dto.setNomRaza(r.getNomRaza());
		dto.setIdEspecie(r.getEspecie().getIdEspecie());
		dto.setDescripcion(r.getDescripcion());
		return dto;
	}
}
