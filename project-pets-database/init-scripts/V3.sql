-- Inserts para tabla especie
INSERT INTO especie (NomEspecie) VALUES
('Perro'),
('Gato'),
('Ave'),
('Conejo'),
('Hámster'),
('Tortuga');

-- RAZAS DE PERRO (idEspecie = 1)
INSERT INTO raza (NomRaza, idEspecie, Descripcion) VALUES
('Labrador Retriever', 1, 'Propenso a displasia de cadera, necesita control de peso'),
('Pastor Alemán', 1, 'Predisposición a mielopatía degenerativa'),
('Bulldog Inglés', 1, 'Síndrome braquicefálico, requiere monitorización respiratoria'),
('Caniche', 1, 'Hipoalergénico, múltiples variedades de tamaño'),
('Dálmata', 1, 'Propenso a sordera congénita y cálculos urinarios'),
('Schnauzer', 1, 'Tendencia a pancreatitis y enfermedades cutáneas'),
('Border Collie', 1, 'Alta energía, necesita estimulación mental constante'),
('San Bernardo', 1, 'Gigante propenso a torsión gástrica'),
('Shar Pei', 1, 'Pliegues cutáneos requieren higiene especial'),
('Akita Inu', 1, 'Temperamento fuerte, vigilancia tiroidea recomendada'),
('Bichón Frisé', 1, 'Blanco puro, propenso a alergias cutáneas'),
('Galgo Español', 1, 'Bajo porcentaje graso, sensibilidad a anestésicos'),
('Cocker Spaniel', 1, 'Otitis recurrentes por orejas caídas'),
('Terranova', 1, 'Nadador natural, vigilancia cardiaca'),
('Mastín Español', 1, 'Gigante con tasa de crecimiento acelerado'),
('Braco Alemán', 1, 'Atlético, requiere chequeos articulares'),
('Shiba Inu', 1, 'Tendencia a conductas escapistas'),
('Boyero de Berna', 1, 'Corta expectativa de vida (6-8 años)'),
('West Highland', 1, 'Predisposición a enfermedad de Addison'),
('Carlino', 1, 'Problemas oculares y respiratorios'),
('Perro Mestizo', 1, 'Cruza natural con diversidad genética. Mayor resistencia a enfermedades hereditarias');

-- RAZAS DE GATO (idEspecie = 2)
INSERT INTO raza (NomRaza, idEspecie, Descripcion) VALUES
('Siamés Moderno', 2, 'Estrabismo común, propenso a amiloidosis'),
('Persa Peke-face', 2, 'Lagrimeo constante por conformación facial'),
('Maine Coon', 2, 'Miocardiopatía hipertrófica frecuente'),
('Bengal', 2, 'Alta necesidad de enriquecimiento ambiental'),
('Esfinge', 2, 'Requiere baños semanales y protección solar'),
('Ragdoll', 2, 'Tendencia a cardiopatías y laxitud articular'),
('Bosque de Noruega', 2, 'Enfermedad de almacenamiento de glucógeno tipo IV'),
('Abisinio', 2, 'Predisposición a amiloidosis renal'),
('Burmés', 2, 'Propenso a diabetes mellitus y hipokalemia'),
('Azul Ruso', 2, 'Sensibilidad gastrointestinal, pelo doble'),
('Somalí', 2, 'Cola de zorro, propenso a déficit de piruvato kinasa'),
('Oriental', 2, 'Metabolismo acelerado, necesidades calóricas altas'),
('Cornish Rex', 2, 'Pelo rizado, termorregulación delicada'),
('Devon Rex', 2, 'Hipotricosis, control de temperatura corporal'),
('Chartreux', 2, 'Mandíbula fuerte, propenso a displasia de cadera'),
('Sagrado de Birmania', 2, 'Gen CS responsable de guantes blancos'),
('Selkirk Rex', 2, 'Mutación recesiva de pelo rizado'),
('Manx', 2, 'Síndrome de Manx por ausencia de cola'),
('Peterbald', 2, 'Variedad de grados de calvicie'),
('Korat', 2, 'Cardiomiopatía hipertrófica común'),
('Gato Callejero', 2, 'Felino de origen indeterminado. Gran adaptabilidad al medio urbano/rural');

-- AVES (idEspecie = 3) - 10 razas
INSERT INTO raza (NomRaza, idEspecie, Descripcion) VALUES
('Periquito Australiano', 3, 'Ave pequeña y colorida de fácil cuidado'),
('Agapornis', 3, 'Loros pequeños conocidos como "pájaros del amor"'),
('Canario', 3, 'Ave cantora popular por su melodioso canto'),
('Cacatúa Ninfa', 3, 'Cacatúa pequeña con mejillas anaranjadas'),
('Loro Gris Africano', 3, 'Ave muy inteligente con gran capacidad de habla'),
('Diamante Mandarín', 3, 'Ave exótica con pico rojo y patrón facial único'),
('Guacamayo Azul', 3, 'Loro grande de vibrantes colores azules'),
('Jilguero Europeo', 3, 'Ave pequeña con canto complejo y melodioso'),
('Cotorra Argentina', 3, 'Ave robusta de color verde brillante'),
('Pinzón Cebra', 3, 'Ave popular con patrón de rayas en el pecho'),
('Paloma Común', 3, 'Ave urbana no doméstica con alta capacidad de adaptación');

-- CONEJOS (idEspecie = 4) - 10 razas
INSERT INTO raza (NomRaza, idEspecie, Descripcion) VALUES
('Conejo Enano', 4, 'Variedad pequeña de conejo doméstico'),
('Conejo Holandés', 4, 'Patrón de color característico en blanco y negro'),
('Conejo Angora', 4, 'Conocido por su largo pelaje sedoso'),
('Conejo Cabeza de León', 4, 'Melena de pelo largo alrededor de la cabeza'),
('Conejo Rex', 4, 'Pelaje aterciopelado y denso'),
('Conejo Gigante de Flandes', 4, 'Raza más grande de conejo doméstico'),
('Conejo Belier', 4, 'Orejas caídas características'),
('Conejo Hotot', 4, 'Ojos rodeados por anillos oscuros'),
('Conejo Himalayo', 4, 'Patrón de color similar al del gato siamés'),
('Conejo Californiano', 4, 'Cuerpo blanco con extremidades oscuras'),
('Conejo Mestizo', 4, 'Híbrido de diversas razas domésticas. Pelaje y talla variables');

-- HÁMSTERS (idEspecie = 5) - 10 razas
INSERT INTO raza (NomRaza, idEspecie, Descripcion) VALUES
('Hámster Sirio', 5, 'El más común, solitario y de hábitos nocturnos'),
('Hámster Ruso', 5, 'Pequeño y social, con línea dorsal oscura'),
('Hámster Roborovski', 5, 'El más pequeño y rápido'),
('Hámster Chino', 5, 'Cola más larga que otras especies'),
('Hámster Campbell', 5, 'Similar al ruso pero con orejas más grandes'),
('Hámster Enano de Winter White', 5, 'Cambia de color en invierno'),
('Hámster Panda', 5, 'Patrón de color blanco y negro'),
('Hámster Dorado', 5, 'Variedad clásica de coloración amarillenta'),
('Hámster Albino', 5, 'Variedad sin pigmentación ocular'),
('Hámster Satinado', 5, 'Pelaje con brillo característico'),
('Hámster Común', 5, 'Variedad no selectiva de coloración mixta');


-- TORTUGAS (idEspecie = 6) - 10 razas
INSERT INTO raza (NomRaza, idEspecie, Descripcion) VALUES
('Tortuga de Florida', 6, 'Tortuga semiacuática con manchas rojas en cabeza'),
('Tortuga Mediterránea', 6, 'Tortuga terrestre con caparazón abombado'),
('Tortuga Rusa', 6, 'Caparazón aplanado y coloración terrosa'),
('Tortuga Sulcata', 6, 'Tercera especie más grande del mundo'),
('Tortuga Leopardo', 6, 'Patrón de manchas similar al felino'),
('Tortuga Caja', 6, 'Caparazón abovedado que cierra completamente'),
('Tortuga Mapa', 6, 'Diseños en caparazón que recuerdan mapas'),
('Tortuga Mordedora', 6, 'Mandíbulas poderosas y temperamento agresivo'),
('Tortuga Almizclera', 6, 'Pequeña tortuga acuática de cuello largo'),
('Tortuga Galápagos', 6, 'Especie gigante endémica del archipiélago'),
('Tortuga de Tierra Común', 6, 'Especie autóctona no catalogada como exótica');

-- Agregar la columna idRaza
ALTER TABLE mascota
  ADD COLUMN idRaza INT;

-- Definirla como NOT NULL (opcional, si tu proyecto lo requiere)
ALTER TABLE mascota
  MODIFY COLUMN idRaza INT NOT NULL;

-- Relacionarla con la tabla raza
ALTER TABLE mascota
  ADD CONSTRAINT fk_mascota_raza
    FOREIGN KEY (idRaza) REFERENCES raza(idRaza);

-- Eliminar columnas antiguas
ALTER TABLE mascota
  DROP COLUMN Especie,
  DROP COLUMN Raza;