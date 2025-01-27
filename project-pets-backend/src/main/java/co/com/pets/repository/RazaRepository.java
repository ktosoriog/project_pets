package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.com.pets.entity.Raza;

public interface RazaRepository extends JpaRepository<Raza, Integer> {
}
