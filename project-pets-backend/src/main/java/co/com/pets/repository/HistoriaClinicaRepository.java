package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.com.pets.entity.HistoriaClinica;

public interface HistoriaClinicaRepository extends JpaRepository<HistoriaClinica, Integer> {
}