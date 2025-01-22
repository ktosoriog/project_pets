package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.com.pets.entity.Rol;

public interface RolRepository extends JpaRepository<Rol, Integer> {

}