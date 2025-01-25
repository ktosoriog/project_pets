package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import co.com.pets.entity.TipoServicio;

public interface TipoServicioRepository extends JpaRepository<TipoServicio, Integer> {
	Page<TipoServicio> findAll(Pageable pageable);
}
