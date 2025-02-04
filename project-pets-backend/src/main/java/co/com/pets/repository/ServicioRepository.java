package co.com.pets.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import co.com.pets.entity.Servicio;

public interface ServicioRepository extends JpaRepository<Servicio, Integer> {

	List<Servicio> findByVet_IdUsuarioAndEstado(Integer idVet, String estado);

}