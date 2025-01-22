-- ========================================
-- 1) CREACIÓN DE LA BASE DE DATOS
-- ========================================
DROP DATABASE IF EXISTS dbprojectpets;
CREATE DATABASE dbprojectpets;
USE dbprojectpets;

-- ========================================
-- 2) TABLA rol
-- ========================================
CREATE TABLE rol (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    NomRol VARCHAR(45) NOT NULL,
    DescripcionRol VARCHAR(100)
)  ENGINE=INNODB;

-- ========================================
-- 3) TABLA usuario
--    (Se usará Correo y Clave para el login)
-- ========================================
CREATE TABLE usuario (
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  NomUsuario VARCHAR(45) NOT NULL,
  ApeUsuario VARCHAR(45),
  Identificacion VARCHAR(45),
  Clave VARCHAR(200),         -- Contraseña encriptada
  Direccion VARCHAR(45),
  Correo VARCHAR(45),         -- Para el login real
  Telefono VARCHAR(45),
  FechaRegistro DATE,
  FechaBaja DATE,
  idRol INT,
  CONSTRAINT fk_usuario_rol 
    FOREIGN KEY (idRol) REFERENCES rol(idRol)
) ENGINE=InnoDB;

-- ========================================
-- 4) TABLA cargo
-- ========================================
CREATE TABLE cargo (
  idCargo INT AUTO_INCREMENT PRIMARY KEY,
  NomCargo VARCHAR(45),
  DetalleCargo VARCHAR(255)
) ENGINE=InnoDB;

-- ========================================
-- 5) TABLA empleado
--    empleado relaciona usuario y cargo
-- ========================================
CREATE TABLE empleado (
  idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT,
  idCargo INT,
  CONSTRAINT fk_empleado_usuario 
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
  CONSTRAINT fk_empleado_cargo 
    FOREIGN KEY (idCargo) REFERENCES cargo(idCargo)
) ENGINE=InnoDB;

-- ========================================
-- 6) TABLA especie
-- ========================================
CREATE TABLE especie (
  idEspecie INT AUTO_INCREMENT PRIMARY KEY,
  NomEspecie VARCHAR(45)
) ENGINE=InnoDB;

-- ========================================
-- 7) TABLA raza
--    raza referencia a especie
-- ========================================
CREATE TABLE raza (
  idRaza INT AUTO_INCREMENT PRIMARY KEY,
  NomRaza VARCHAR(45),
  idEspecie INT,
  Descripcion VARCHAR(255),
  CONSTRAINT fk_raza_especie 
    FOREIGN KEY (idEspecie) REFERENCES especie(idEspecie)
) ENGINE=InnoDB;

-- ========================================
-- 8) TABLA mascota
--    Campos básicos, se asume
--    que “Especie” y “Raza” son
--    simples textos. (Podrías hacer
--    una FK a raza y especie si lo deseas.)
-- ========================================
CREATE TABLE mascota (
  idMascota INT AUTO_INCREMENT PRIMARY KEY,
  NomMascota VARCHAR(45),
  FechaNacimiento DATE,
  Especie VARCHAR(45),
  Raza VARCHAR(45)
) ENGINE=InnoDB;

-- ========================================
-- 9) TABLA cliente
--    cliente relaciona usuario y,
--    opcionalmente, mascota
-- ========================================
CREATE TABLE cliente (
  idCliente INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT,
  idMascota INT,
  CONSTRAINT fk_cliente_usuario 
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
) ENGINE=InnoDB;

-- Para enlazar la mascota, si tu diagrama lo requiere:
ALTER TABLE cliente
  ADD CONSTRAINT fk_cliente_mascota 
    FOREIGN KEY (idMascota) REFERENCES mascota(idMascota);

-- ========================================
-- 10) TABLA tiposervicio
-- ========================================
CREATE TABLE tiposervicio (
  idTipoServ INT AUTO_INCREMENT PRIMARY KEY,
  NomBreServ VARCHAR(45),
  Precio DOUBLE,
  Descripcion VARCHAR(255)
) ENGINE=InnoDB;

-- ========================================
-- 11) TABLA producto
-- ========================================
CREATE TABLE producto (
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
  NomProducto VARCHAR(45),
  PrecioUnitario DOUBLE,
  Descripcion VARCHAR(255)
) ENGINE=InnoDB;

-- ========================================
-- 12) TABLA servicio
--    Relaciona mascota, empleado,
--    tiposervicio y producto (opcional).
-- ========================================
CREATE TABLE servicio (
  idServicio INT AUTO_INCREMENT PRIMARY KEY,
  FechaServ DATE,
  idMascota INT,
  idEmpleado INT,
  idTipoServ INT,
  idProducto INT,
  description TEXT,
  CONSTRAINT fk_servicio_mascota 
    FOREIGN KEY (idMascota) REFERENCES mascota(idMascota),
  CONSTRAINT fk_servicio_empleado 
    FOREIGN KEY (idEmpleado) REFERENCES empleado(idEmpleado),
  CONSTRAINT fk_servicio_tiposerv 
    FOREIGN KEY (idTipoServ) REFERENCES tiposervicio(idTipoServ),
  CONSTRAINT fk_servicio_producto 
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
) ENGINE=InnoDB;

-- ========================================
-- 13) TABLA factura
--    Campos que se ven en el diagrama
-- ========================================
CREATE TABLE factura (
  idFactura INT AUTO_INCREMENT PRIMARY KEY,
  nFactura VARCHAR(45),
  Estado VARCHAR(45),
  FechaFact VARCHAR(45),
  Iva INT
) ENGINE=InnoDB;

-- ========================================
-- 14) TABLA detalleservicio
--    Une factura con servicio
-- ========================================
CREATE TABLE detalleservicio (
  idDetalleServ INT AUTO_INCREMENT PRIMARY KEY,
  idFactura INT,
  idServicio INT,
  Cantidad INT,
  Total DOUBLE,
  CONSTRAINT fk_detalleserv_factura 
    FOREIGN KEY (idFactura) REFERENCES factura(idFactura),
  CONSTRAINT fk_detalleserv_servicio 
    FOREIGN KEY (idServicio) REFERENCES servicio(idServicio)
) ENGINE=InnoDB;

-- ========================================
-- 15) TABLA historiaclinica
--    Relaciona mascota
-- ========================================
CREATE TABLE historiaclinica (
  idHistoria INT AUTO_INCREMENT PRIMARY KEY,
  idMascota INT,
  FechaServ DATE,
  Detalle VARCHAR(255),
  CONSTRAINT fk_historia_mascota 
    FOREIGN KEY (idMascota) REFERENCES mascota(idMascota)
) ENGINE=InnoDB;

-- ========================================
-- 16) TABLA formapago
-- ========================================
CREATE TABLE formapago (
  idFormaPago INT AUTO_INCREMENT PRIMARY KEY,
  NomFormaPago VARCHAR(45)
) ENGINE=InnoDB;

-- ========================================
-- 17) TABLA recibopago
--    Referencia factura y formapago
-- ========================================
CREATE TABLE recibopago (
  idReciboPago INT AUTO_INCREMENT PRIMARY KEY,
  idFactura INT,
  FormaPago INT,
  ValorPagado DOUBLE,
  CONSTRAINT fk_recibo_factura 
    FOREIGN KEY (idFactura) REFERENCES factura(idFactura),
  CONSTRAINT fk_recibo_formapago 
    FOREIGN KEY (FormaPago) REFERENCES formapago(idFormaPago)
) ENGINE=InnoDB;

-- ========================================
-- 18) TABLA inventario
--    Control de existencias por producto
-- ========================================
CREATE TABLE inventario (
  idInventario INT AUTO_INCREMENT PRIMARY KEY,
  idProducto INT,
  CanDisponible INT,
  Ingreso DATE,
  Salida DATE,
  StopMin INT,
  CONSTRAINT fk_inventario_producto 
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
) ENGINE=InnoDB;

-- ========================================
-- FINAL: BD lista. Ajustar si en tu MER
-- hay algunas columnas extra o quieres
-- forzar ON DELETE CASCADE, etc.
-- ========================================
