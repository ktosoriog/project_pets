package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.com.pets.entity.Inventario;

public interface InventarioRepository extends JpaRepository<Inventario, Integer> {

}