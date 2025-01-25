-- Roles (3 roles principales)
INSERT INTO rol (NomRol, DescripcionRol) VALUES
('ADMINISTRADOR', 'Acceso total al sistema'),
('VETERINARIO', 'Rol para personal veterinario'),
('CLIENTE', 'Rol para los clientes');


-- Ejemplo: 3 usuarios, cada uno con un rol diferente
-- Campos relevantes: idRol, Correo, Clave, etc.
-- Asumiendo las contraseñas encriptadas con Bcrypt
INSERT INTO usuario (NomUsuario, ApeUsuario, Correo, Clave, idRol)
VALUES
('Carlos', 'Admin', 'admin@pets.com',
 '$2a$10$rKR9yfhY7FvvjvMVMs8sUu1jhWjNoiu/AhlpecpjtCBeRxZVjmNRG', 1), -- ADMINISTRADOR

('Diana', 'Vet', 'vet@pets.com',
 '$2a$10$rKR9yfhY7FvvjvMVMs8sUu1jhWjNoiu/AhlpecpjtCBeRxZVjmNRG', 2), -- VETERINARIO

('Juan', 'Cliente', 'cliente@pets.com',
 '$2a$10$rKR9yfhY7FvvjvMVMs8sUu1jhWjNoiu/AhlpecpjtCBeRxZVjmNRG', 3); -- CLIENTE
 
 -- Ajuste tabla usuario
 ALTER TABLE `dbprojectpets`.`usuario` 
CHANGE COLUMN `Direccion` `Direccion` VARCHAR(45) NULL ,
ADD UNIQUE INDEX `Correo_UNIQUE` (`Correo` ASC) VISIBLE;

ALTER TABLE usuario CHANGE COLUMN FechaBaja FechaActualizacion DATE;