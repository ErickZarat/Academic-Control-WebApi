CREATE TABLE rol (
	idRol INT NOT NULL PRIMARY KEY,
    nombreRol VARCHAR(45) NOT NULL
);

CREATE TABLE usuario (
	idUsuario INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) NOT NULL,
    nick VARCHAR(45) NOT NULL,
    contrasena VARCHAR(45) NOT NULL,
    idRol INT REFERENCES rol(idRol)
);


CREATE TABLE materia (
	idMateria INT NOT NULL PRIMARY KEY,
    nombreMateria VARCHAR(45) NOT NULL
);

CREATE TABLE detalleMateria(
	idDetalle INT NOT NULL PRIMARY KEY,
    idMateria INT REFERENCES materia(idMateria),
    idUsuario INT REFERENCES usuario(idUsuario)
);

CREATE TABLE bimestre(
	idBimestre INT NOT NULL PRIMARY KEY,
    nombreBimestre VARCHAR (45) NOT NULL
);

CREATE TABLE grado(
	idGrado INT NOT NULL PRIMARY KEY,
    nombreGrado VARCHAR (45) NOT NULL
);

CREATE TABLE seccion(
	idSeccion INT NOT NULL PRIMARY KEY,
    nombreSeccion VARCHAR(45) NOT NULL
);

CREATE TABLE planificacion(
	idPlanificacion INT NOT NULL PRIMARY KEY,
    idBimestre INT REFERENCES bimestre(idBimestre),
    idUsuario INT REFERENCES usuario(idUsuario),
    competencia VARCHAR(200) NOT NULL,
    idMateria INT REFERENCES materia(idMateria),
    idGrado INT REFERENCES grado (idGrado)
);

CREATE TABLE actividad(
	idActividad INT NOT NULL PRIMARY KEY,
    contenido VARCHAR (200) NOT NULL,
    fechaInicial  DATETIME NOT NULL,
    fechaFinal DATETIME NOT NULL,
    materiales  VARCHAR (200) NOT NULL,
    tareas  VARCHAR (200) NOT NULL,
    ponderacion  VARCHAR (200) NOT NULL,
    logro  VARCHAR (200) NOT NULL,
    idPlanificacion INT REFERENCES planificacion(idPlanificacion)
);

CREATE TABLE detalleAlumno(
	idDetalleAlumno INT NOT NULL PRIMARY KEY,
    idUsuario INT REFERENCES usuario(idUsuario),
    idGrado INT REFERENCES grado(idGrado),
    idSeccion INT REFERENCES seccion(idSeccion)
);

CREATE TABLE nota(
	idNota INT NOT NULL PRIMARY KEY,
    punteo INT NOT NULL,
    idActividad INT REFERENCES actividad(idActividad),
    idDetalleAlumno INT REFERENCES detalleAlumno(idDetalleAlumno)
);