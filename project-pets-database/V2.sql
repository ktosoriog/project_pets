-- Roles (3 roles principales)
INSERT INTO ROL (NomRol, DescripcionRol) VALUES
('ADMINISTRADOR', 'Acceso total al sistema'),
('VETERINARIO', 'Rol para personal veterinario'),
('CLIENTE', 'Rol para los clientes');


-- Ejemplo: 3 usuarios, cada uno con un rol diferente
-- Campos relevantes: idRol, Correo, Clave, etc.
-- Asumiendo las contraseñas encriptadas con Bcrypt
INSERT INTO USUARIO (NomUsuario, ApeUsuario, Correo, Clave, idRol)
VALUES
('Carlos', 'Admin', 'admin@pets.com',
 '$2a$10$an3UJAF3xspAlB7z9k2h2Oa31vyN0pUime.9muZ1r7cY6kUTH3yF.', 1), -- ADMINISTRADOR

('Diana', 'Vet', 'vet@pets.com',
 '$2a$10$zvZk8qxCLG.HDdQoeB81IOWn4RBj2j5Ws4NEp.9YpaZpcRe0QKNg2', 2), -- VETERINARIO

('Juan', 'Cliente', 'cliente@pets.com',
 '$2a$10$uI0IT.Rq9zKOeI3GLzTtyu93P6vSFs6vVUSdUAyySVfV.zaxHYXr.', 3); -- CLIENTE