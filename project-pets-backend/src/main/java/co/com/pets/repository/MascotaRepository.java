package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.com.pets.entity.Mascota;

public interface MascotaRepository extends JpaRepository<Mascota, Integer> {
}
