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

create table planificacion(
	idPlanificacion int not null primary key auto_increment,
    idBimestre int not null,
    foreign key (idBimestre) references bimestre(idBimestre),
    idUsuario int not null,
    foreign key (idUsuario) references usuario(idUsuario),
    competencia varchar(200) not null
);

create table actividad(
	idActividad int not null primary key auto_increment,
    contenido varchar (200) not null,
    fechas  varchar (100) not null,
    materiales  varchar (200) not null,
    tareas  varchar (200) not null,
    ponderacion  varchar (200) not null,
    logro  varchar (200) not null,
    idPlanificacion int not null,
    foreign key (idPlanificacion) references planificacion(idPlanificacion)
);
