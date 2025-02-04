package co.com.pets.service;

import java.util.List;
import org.springframework.data.domain.Page;
import co.com.pets.dto.ServicioDTO;

public interface ServicioService {

	ServicioDTO crearServicioCliente(ServicioDTO dto, Integer idCliente);

	Page<ServicioDTO> listarServiciosCliente(int pagina, int size, Integer idCliente, String filtro);

	Page<ServicioDTO> listarServiciosVet(int pagina, int size, Integer idVet, String filtro);

	Page<ServicioDTO> listarServiciosAdmin(int pagina, int size, String filtro);

	ServicioDTO actualizarEstadoServicio(Integer idServicio, String nuevoEstado, Integer idVet);

	ServicioDTO editarServicio(Integer idServicio, ServicioDTO dto);

	List<ServicioDTO> listarTodoPorRol(String rol, Integer idUsuario);

}
