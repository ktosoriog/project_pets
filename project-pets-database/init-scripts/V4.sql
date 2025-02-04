-- ------------------------------------------------------
-- SERVICIOS GENERALES PARA TODAS LAS ESPECIES
-- ------------------------------------------------------
INSERT INTO tiposervicio (NomBreServ, Precio, Descripcion) VALUES
('Consulta básica', 25000, 'Revisión general de salud'),
('Vacunación anual', 45000, 'Aplicación de vacunas obligatorias'),
('Desparasitación básica', 20000, 'Tratamiento antiparasitario oral'),
('Corte de uñas', 15000, 'Incluye limado y hemostasia'),
('Microchipado', 60000, 'Implantación de chip identificador');

-- ------------------------------------------------------
-- SERVICIOS ESPECÍFICOS PARA PERROS (razas pequeñas <=10kg)
-- ------------------------------------------------------
INSERT INTO tiposervicio (NomBreServ, Precio, Descripcion) VALUES
('Baño terapéutico mini', 35000, 'Para razas <10kg con shampoo hipoalergénico'),
('Corte de pelo estilo puppy', 40000, 'Corte técnico para razas toy'),
('Limpieza de glándulas anales', 18000, 'Expresión manual controlada'),
('Otodectia mini', 22000, 'Limpieza profunda de oídos en razas pequeñas'),
('Protector dental mini', 28000, 'Aplicación de sellante para dientes pequeños'),
('Paquete wellness mini', 120000, 'Incluye vacuna, baño y corte de uñas para <10kg');

-- ------------------------------------------------------
-- SERVICIOS PARA GATOS (incluyendo razas pequeñas)
-- ------------------------------------------------------
INSERT INTO tiposervicio (NomBreServ, Precio, Descripcion) VALUES
('Baño antiestrés felino', 50000, 'Técnica de bajo estrés con secado en cabina'),
('Corte de pelo lion cut', 45000, 'Estilo león para gatos de pelo largo'),
('Paquete gatito primerizo', 95000, 'Vacunas + desparasitación + chip para <6 meses'),
('Limpieza de sacos lagrimales', 17000, 'Para razas braquicefálicas mini'),
('Terapia láser para caídas', 30000, 'Recuperación de saltos en gatos urbanos');

-- ------------------------------------------------------
-- SERVICIOS DE EMERGENCIA
-- ------------------------------------------------------
INSERT INTO tiposervicio (NomBreServ, Precio, Descripcion) VALUES
('Reanimación cardiopulmonar', 150000, 'RCP para pacientes en paro'),
('Oxigenoterapia de urgencia', 80000, 'Por hora con máscara específica'),
('Transfusión sanguínea', 250000, 'Incluye pruebas cruzadas'),
('Lavado gástrico mini', 120000, 'Para intoxicaciones en <10kg'),
('Sutura de heridas complejas', 90000, 'Técnica de capas en razas pequeñas');

-- ------------------------------------------------------
-- SERVICIOS ESPECIALIZADOS
-- ------------------------------------------------------
INSERT INTO tiposervicio (NomBreServ, Precio, Descripcion) VALUES
('Ortodoncia para mini razas', 300000, 'Alineación dental en pacientes pequeños'),
('Cirugía de luxación rotuliana', 450000, 'Corrección quirúrgica en patologías mini'),
('Dermatoscopía digital', 75000, 'Mapeo de lesiones cutáneas'),
('Artrocentesis diagnóstica', 110000, 'Análisis de líquido sinovial'),
('Prueba de alergia alimentaria', 180000, 'Panel de 25 alergenos comunes');

-- ------------------------------------------------------
-- PAQUETES PREVENTIVOS
-- ------------------------------------------------------
INSERT INTO tiposervicio (NomBreServ, Precio, Descripcion) VALUES
('Plan cachorro premium', 200000, '3 consultas + vacunas + chip + baño'),
('Senior care mini', 150000, 'Perfil geriátrico + ecografía abdominal'),
('Pre-operatorio express', 130000, 'Hemograma + bioquímico + coagulación'),
('Desfile canino premium', 85000, 'Baño + corte show + perfume + cinta'),
('Guardería médica diurna', 30000, 'Por hora con supervisión veterinaria');

-- ------------------------------------------------------
-- SERVICIOS DE BELLEZA ESPECIALIZADA
-- ------------------------------------------------------
INSERT INTO tiposervicio (NomBreServ, Precio, Descripcion) VALUES
('Spa aromaterapia mini', 55000, 'Masaje relajante + aceites esenciales'),
('Tinte vegano temporal', 40000, 'Coloración no tóxica para pelo'),
('Hidroterapia mini', 28000, 'Sesión en cinta subacuática para <10kg'),
('Pedicura spa', 23000, 'Incluye pulido y protección de almohadillas'),
('Maquillaje para shows', 15000, 'Diseño facial con productos seguros');