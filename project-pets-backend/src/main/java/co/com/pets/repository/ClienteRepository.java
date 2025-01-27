package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.com.pets.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}
