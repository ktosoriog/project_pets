package co.com.pets.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.com.pets.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

	Usuario findByCorreo(String correo);

}