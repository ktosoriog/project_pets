package co.com.pets.service;

import java.util.List;
import co.com.pets.dto.RazaDTO;

public interface RazaService {

	List<RazaDTO> listarPorEspecie(Integer idEspecie);
}
