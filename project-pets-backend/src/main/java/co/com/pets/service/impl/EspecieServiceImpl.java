package co.com.pets.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import co.com.pets.dto.EspecieDTO;
import co.com.pets.entity.Especie;
import co.com.pets.repository.EspecieRepository;
import co.com.pets.service.EspecieService;

@Service
public class EspecieServiceImpl implements EspecieService {

	private final EspecieRepository especieRepository;

	public EspecieServiceImpl(EspecieRepository especieRepository) {
		this.especieRepository = especieRepository;
	}

	@Override
	public List<EspecieDTO> listarTodo() {
		return especieRepository.findAll().stream().map(this::convertirDto).toList();
	}

	private EspecieDTO convertirDto(Especie e) {
		EspecieDTO dto = new EspecieDTO();
		dto.setIdEspecie(e.getIdEspecie());
		dto.setNomEspecie(e.getNomEspecie());
		return dto;
	}
}
