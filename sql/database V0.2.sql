create table rol (
	idRol int not null primary key auto_increment,
    nombreRol varchar(45) not null
);

create table usuario (
	idUsuario int not null primary key auto_increment,
    nombre varchar(45) not null,
    apellido varchar(45) not null,
    nick varchar(45) not null,
    contrasena varchar(45) not null,
    idRol int not null,
    foreign key (idRol) references rol(idRol)
);


create table materia (
	idMateria int not null primary key auto_increment,
    nombreMateria varchar(45) not null
);

create table detalleMateria(
	idDetalle int not null primary key auto_increment,
    idMateria int not null,
    foreign key (idMateria) references materia(idMateria),
    idUsuario int not null,
    foreign key (idUsuario) references usuario(idUsuario)
);

create table bimestre(
	idBimestre int not null primary key auto_increment,
    nombreBimestre varchar (45) not null
);

create table grado(
	idGrado int not null primary key auto_increment,
    nombreGrado varchar (45) not null
);

create table seccion(
	idSeccion int not null primary key auto_increment,
    nombreSeccion varchar(45) not null
);

create table planificacion(
	idPlanificacion int not null primary key auto_increment,
    idBimestre int not null,
    foreign key (idBimestre) references bimestre(idBimestre),
    idUsuario int not null,
    foreign key (idUsuario) references usuario(idUsuario),
    competencia varchar(200) not null,
    idMateria int not null,
    foreign key (idMateria) references materia(idMateria),
    idGrado int not null,
    foreign key (idGrado) references grado (idGrado)
);

create table actividad(
	idActividad int not null primary key auto_increment,
    contenido varchar (200) not null,
    fechaInicial  datetime not null,
    fechaFinal dateTime not null,
    materiales  varchar (200) not null,
    tareas  varchar (200) not null,
    ponderacion  varchar (200) not null,
    logro  varchar (200) not null,
    idPlanificacion int not null,
    foreign key (idPlanificacion) references planificacion(idPlanificacion)
);

create table detalleAlumno(
	idDetalleAlumno int not null primary key auto_increment,
    idUsuario int not null,
    foreign key (idUsuario) references usuario(idUsuario),
    idGrado int not null,
    foreign key (idGrado) references grado(idGrado),
    idSeccion int not null,
    foreign key (idSeccion) references seccion(idSeccion)
);

create table nota(
	idNota int not null primary key auto_increment,
    punteo int not null,
    idActividad int not null,
    foreign key (idActividad) references actividad(idActividad),
    idDetalleAlumno int not null,
    foreign key (idDetalleAlumno) references detalleAlumno(idDetalleAlumno)
);