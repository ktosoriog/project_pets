-- ========================================
-- 1) CREACIÓN DE LA BASE DE DATOS
-- ========================================
DROP DATABASE IF EXISTS dbprojectpets;
CREATE DATABASE dbprojectpets;
USE dbprojectpets;

-- ========================================
-- 2) TABLA ROL
-- ========================================
CREATE TABLE ROL (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    NomRol VARCHAR(45) NOT NULL,
    DescripcionRol VARCHAR(100)
)  ENGINE=INNODB;

-- ========================================
-- 3) TABLA USUARIO
--    (Se usará Correo y Clave para el login)
-- ========================================
CREATE TABLE USUARIO (
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
    FOREIGN KEY (idRol) REFERENCES ROL(idRol)
) ENGINE=InnoDB;

-- ========================================
-- 4) TABLA CARGO
-- ========================================
CREATE TABLE CARGO (
  idCargo INT AUTO_INCREMENT PRIMARY KEY,
  NomCargo VARCHAR(45),
  DetalleCargo VARCHAR(255)
) ENGINE=InnoDB;

-- ========================================
-- 5) TABLA EMPLEADO
--    Empleado relaciona USUARIO y CARGO
-- ========================================
CREATE TABLE EMPLEADO (
  idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT,
  idCargo INT,
  CONSTRAINT fk_empleado_usuario 
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
  CONSTRAINT fk_empleado_cargo 
    FOREIGN KEY (idCargo) REFERENCES CARGO(idCargo)
) ENGINE=InnoDB;

-- ========================================
-- 6) TABLA ESPECIE
-- ========================================
CREATE TABLE ESPECIE (
  idEspecie INT AUTO_INCREMENT PRIMARY KEY,
  NomEspecie VARCHAR(45)
) ENGINE=InnoDB;

-- ========================================
-- 7) TABLA RAZA
--    Raza referencia a ESPECIE
-- ========================================
CREATE TABLE RAZA (
  idRaza INT AUTO_INCREMENT PRIMARY KEY,
  NomRaza VARCHAR(45),
  idEspecie INT,
  Descripcion VARCHAR(255),
  CONSTRAINT fk_raza_especie 
    FOREIGN KEY (idEspecie) REFERENCES ESPECIE(idEspecie)
) ENGINE=InnoDB;

-- ========================================
-- 8) TABLA MASCOTA
--    Campos básicos, se asume
--    que “Especie” y “Raza” son
--    simples textos. (Podrías hacer
--    una FK a RAZA y ESPECIE si lo deseas.)
-- ========================================
CREATE TABLE MASCOTA (
  idMascota INT AUTO_INCREMENT PRIMARY KEY,
  NomMascota VARCHAR(45),
  FechaNacimiento DATE,
  Especie VARCHAR(45),
  Raza VARCHAR(45)
) ENGINE=InnoDB;

-- ========================================
-- 9) TABLA CLIENTE
--    Cliente relaciona USUARIO y,
--    opcionalmente, MASCOTA
-- ========================================
CREATE TABLE CLIENTE (
  idCliente INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT,
  idMascota INT,
  CONSTRAINT fk_cliente_usuario 
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
) ENGINE=InnoDB;

-- Para enlazar la mascota, si tu diagrama lo requiere:
ALTER TABLE CLIENTE
  ADD CONSTRAINT fk_cliente_mascota 
    FOREIGN KEY (idMascota) REFERENCES MASCOTA(idMascota);

-- ========================================
-- 10) TABLA TIPOSERVICIO
-- ========================================
CREATE TABLE TIPOSERVICIO (
  idTipoServ INT AUTO_INCREMENT PRIMARY KEY,
  NomBreServ VARCHAR(45),
  Precio DOUBLE,
  Descripcion VARCHAR(255)
) ENGINE=InnoDB;

-- ========================================
-- 11) TABLA PRODUCTO
-- ========================================
CREATE TABLE PRODUCTO (
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
  NomProducto VARCHAR(45),
  PrecioUnitario DOUBLE,
  Descripcion VARCHAR(255)
) ENGINE=InnoDB;

-- ========================================
-- 12) TABLA SERVICIO
--    Relaciona Mascota, Empleado,
--    TipoServicio y Producto (opcional).
-- ========================================
CREATE TABLE SERVICIO (
  idServicio INT AUTO_INCREMENT PRIMARY KEY,
  FechaServ DATE,
  idMascota INT,
  idEmpleado INT,
  idTipoServ INT,
  idProducto INT,
  description TEXT,
  CONSTRAINT fk_servicio_mascota 
    FOREIGN KEY (idMascota) REFERENCES MASCOTA(idMascota),
  CONSTRAINT fk_servicio_empleado 
    FOREIGN KEY (idEmpleado) REFERENCES EMPLEADO(idEmpleado),
  CONSTRAINT fk_servicio_tiposerv 
    FOREIGN KEY (idTipoServ) REFERENCES TIPOSERVICIO(idTipoServ),
  CONSTRAINT fk_servicio_producto 
    FOREIGN KEY (idProducto) REFERENCES PRODUCTO(idProducto)
) ENGINE=InnoDB;

-- ========================================
-- 13) TABLA FACTURA
--    Campos que se ven en el diagrama
-- ========================================
CREATE TABLE FACTURA (
  idFactura INT AUTO_INCREMENT PRIMARY KEY,
  nFactura VARCHAR(45),
  Estado VARCHAR(45),
  FechaFact VARCHAR(45),
  Iva INT
) ENGINE=InnoDB;

-- ========================================
-- 14) TABLA DETALLESERVICIO
--    Une FACTURA con SERVICIO
-- ========================================
CREATE TABLE DETALLESERVICIO (
  idDetalleServ INT AUTO_INCREMENT PRIMARY KEY,
  idFactura INT,
  idServicio INT,
  Cantidad INT,
  Total DOUBLE,
  CONSTRAINT fk_detalleserv_factura 
    FOREIGN KEY (idFactura) REFERENCES FACTURA(idFactura),
  CONSTRAINT fk_detalleserv_servicio 
    FOREIGN KEY (idServicio) REFERENCES SERVICIO(idServicio)
) ENGINE=InnoDB;

-- ========================================
-- 15) TABLA HISTORIACLINICA
--    Relaciona Mascota
-- ========================================
CREATE TABLE HISTORIACLINICA (
  idHistoria INT AUTO_INCREMENT PRIMARY KEY,
  idMascota INT,
  FechaServ DATE,
  Detalle VARCHAR(255),
  CONSTRAINT fk_historia_mascota 
    FOREIGN KEY (idMascota) REFERENCES MASCOTA(idMascota)
) ENGINE=InnoDB;

-- ========================================
-- 16) TABLA FORMAPAGO
-- ========================================
CREATE TABLE FORMAPAGO (
  idFormaPago INT AUTO_INCREMENT PRIMARY KEY,
  NomFormaPago VARCHAR(45)
) ENGINE=InnoDB;

-- ========================================
-- 17) TABLA RECIBOPAGO
--    Referencia FACTURA y FORMAPAGO
-- ========================================
CREATE TABLE RECIBOPAGO (
  idReciboPago INT AUTO_INCREMENT PRIMARY KEY,
  idFactura INT,
  FormaPago INT,
  ValorPagado DOUBLE,
  CONSTRAINT fk_recibo_factura 
    FOREIGN KEY (idFactura) REFERENCES FACTURA(idFactura),
  CONSTRAINT fk_recibo_formapago 
    FOREIGN KEY (FormaPago) REFERENCES FORMAPAGO(idFormaPago)
) ENGINE=InnoDB;

-- ========================================
-- 18) TABLA INVENTARIO
--    Control de existencias por Producto
-- ========================================
CREATE TABLE INVENTARIO (
  idInventario INT AUTO_INCREMENT PRIMARY KEY,
  idProducto INT,
  CanDisponible INT,
  Ingreso DATE,
  Salida DATE,
  StopMin INT,
  CONSTRAINT fk_inventario_producto 
    FOREIGN KEY (idProducto) REFERENCES PRODUCTO(idProducto)
) ENGINE=InnoDB;

-- ========================================
-- FINAL: BD lista. Ajustar si en tu MER
-- hay algunas columnas extra o quieres
-- forzar ON DELETE CASCADE, etc.
-- ========================================
