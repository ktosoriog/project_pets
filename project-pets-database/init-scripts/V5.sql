-- Eliminar la FK existente a 'producto' y columna idProducto
ALTER TABLE servicio
  DROP FOREIGN KEY fk_servicio_producto;

ALTER TABLE servicio
  DROP COLUMN idProducto;

-- Eliminar la FK a 'empleado'
ALTER TABLE servicio
  DROP FOREIGN KEY fk_servicio_empleado;

ALTER TABLE servicio
  DROP COLUMN idEmpleado;

-- Ahora, en vez de idEmpleado, usaremos idVet (relacionado a la tabla usuario)
-- y también el idCliente, para saber qué cliente pidió el servicio.
ALTER TABLE servicio
  ADD COLUMN idVet INT,
  ADD COLUMN idCliente INT;

-- Las FK apropiadas
ALTER TABLE servicio
  ADD CONSTRAINT fk_servicio_vet
    FOREIGN KEY (idVet) REFERENCES usuario(idUsuario);

-- A su vez, el cliente también es un usuario
ALTER TABLE servicio
  ADD CONSTRAINT fk_servicio_cliente
    FOREIGN KEY (idCliente) REFERENCES usuario(idUsuario);

-- Hora del servicio
ALTER TABLE servicio
      ADD COLUMN horaServicio VARCHAR(5);
      
-- Agregamos la columna 'estado' con un valor por defecto = 'PENDIENTE'
ALTER TABLE servicio
  ADD COLUMN estado VARCHAR(45) NOT NULL DEFAULT 'PENDIENTE';

-- Eliminamos la antigua FK a 'empleado' si quedase algo colgando
DROP TABLE IF EXISTS empleado;

-- Eliminar la FK y columna idMascota
ALTER TABLE historiaclinica
  DROP FOREIGN KEY fk_historia_mascota;

ALTER TABLE historiaclinica
  DROP COLUMN idMascota;

ALTER TABLE historiaclinica
  ADD COLUMN idServicio INT;

ALTER TABLE historiaclinica
  ADD CONSTRAINT fk_historia_servicio
    FOREIGN KEY (idServicio) REFERENCES servicio(idServicio);