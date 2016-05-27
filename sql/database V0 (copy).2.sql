create table rol (
	idRol SERIAL PRIMARY KEY,
    nombreRol VARCHAR(45) NOT NULL
);

create table usuario (
	idUsuario SERIAL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) NOT NULL,
    nick VARCHAR(45) NOT NULL UNIQUE,
    contrasena VARCHAR(45) NOT NULL,
    idRol INT REFERENCES rol(idRol)
);


create table materia (
	idMateria SERIAL PRIMARY KEY,
    nombreMateria VARCHAR(45) NOT NULL
);

create table detalleMateria(
	idDetalle SERIAL PRIMARY KEY,
    idMateria INT REFERENCES materia(idMateria),
    idUsuario INT REFERENCES usuario(idUsuario)
);

create table bimestre(
	idBimestre SERIAL PRIMARY KEY,
    nombreBimestre VARCHAR (45) NOT NULL
);

create table grado(
	idGrado SERIAL PRIMARY KEY,
    nombreGrado VARCHAR (45) NOT NULL
);

create table seccion(
	idSeccion SERIAL PRIMARY KEY,
    nombreSeccion VARCHAR(45) NOT NULL
);

create table planificacion(
	idPlanificacion SERIAL PRIMARY KEY,
    idBimestre INT REFERENCES bimestre(idBimestre),
    idUsuario INT REFERENCES usuario(idUsuario),
    competencia VARCHAR(200) NOT NULL,
    idMateria INT REFERENCES materia(idMateria),
    idGrado INT REFERENCES grado (idGrado)
);

create table actividad(
	idActividad SERIAL PRIMARY KEY,
    contenido VARCHAR (200) NOT NULL,
    fechaInicial  DATE NOT NULL,
    fechaFinal DATE NOT NULL,
    materiales  VARCHAR (200) NOT NULL,
    tareas  VARCHAR (200) NOT NULL,
    ponderacion  VARCHAR (200) NOT NULL,
    logro  VARCHAR (200) NOT NULL,
    idPlanificacion INT REFERENCES planificacion(idPlanificacion)
);

create table detalleAlumno(
	idDetalleAlumno SERIAL PRIMARY KEY,
    idUsuario INT REFERENCES usuario(idUsuario),
    idGrado INT REFERENCES grado(idGrado),
    idSeccion INT REFERENCES seccion(idSeccion)
);

create table nota(
	idNota SERIAL PRIMARY KEY,
    punteo INT NOT NULL,
    idActividad INT REFERENCES actividad(idActividad),
    idDetalleAlumno INT REFERENCES detalleAlumno(idDetalleAlumno)
);