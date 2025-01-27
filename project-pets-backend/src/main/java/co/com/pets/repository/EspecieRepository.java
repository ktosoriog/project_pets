package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.com.pets.entity.Especie;

public interface EspecieRepository extends JpaRepository<Especie, Integer> {
}
