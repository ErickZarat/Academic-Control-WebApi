var express = require('express');
var router = express.Router();
var Usuario = require('../model/usuario');


router.get('/api/usuario/',function(peticion, respuesta) {
	Usuario.getUsuarios(function(error, usuarios) {
		if(typeof usuarios !=='undefined') {
			respuesta.json(usuarios);
		}else{
			respuesta.json({"Mensaje": "No hay usuarios"});
		}
	});
});

router.get('/api/usuario/detalle',function(peticion, respuesta) {
	Usuario.getUsuariosDetalle(function(error, usuarios) {
		if(typeof usuarios !=='undefined') {
			respuesta.json(usuarios);
		}else{
			respuesta.json({"Mensaje": "No hay usuarios"});
		}
	});
});

router.post('/api/usuario/autenticar', function(peticion, respuesta){
	var usuario = {
		nick:peticion.body.nick,
		contrasena:peticion.body.contrasena
	}
	Usuario.autenticar(usuario, function(error, usr){
		if (typeof usr !== undefined){
			respuesta.json(usr);
		} else {
			respuesta.json({"Mensaje":"El nick o la contrasena no estan registrados"});
		}
	});
});

router.get('/api/profesor/',function(peticion, respuesta) {
	Usuario.getProfesores(function(error, usuarios) {
		if(typeof usuarios !=='undefined') {
			respuesta.json(usuarios);
		}else{
			respuesta.json({"Mensaje": "No hay usuarios"});
		}
	});
});

router.get('/api/profesor/:idUsuario',function(peticion, respuesta){
	var idUsuario = peticion.params.idUsuario;

	if (!isNaN(idUsuario)){
		Usuario.getProfesor(idUsuario, function(error, usuarios){
			if (typeof usuarios !== undefined){
				respuesta.json(usuarios);
			} else{
				respuesta.json({"Mensaje":"No hay usuarios"});
			}
		});
	} else {
		respuesta.json({"Mensaje":"el id debe ser numerico"})
	}
});

router.get('/api/alumno/',function(peticion, respuesta) {
	Usuario.getAlumnos(function(error, usuarios) {
		if(typeof usuarios !=='undefined') {
			respuesta.json(usuarios);
		}else{
			respuesta.json({"Mensaje": "No hay usuarios"});
		}
	});
});

router.get('/api/usuario/:idUsuario', function(peticion, respuesta) {
	var idUsuario = peticion.params.idUsuario;
	if(!isNaN(idUsuario)){
		Usuario.getUsuario(idUsuario, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato[0]);
			} else {
				respuesta.json({"Mensaje" : "No existe Usuario"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "el id debe ser numerico"});
	}
});

router.post('/api/usuario', function(peticion, respuesta){
	var usuario = {
		idUsuario : null,
		nombre : peticion.body.nombre,
		apellido : peticion.body.apellido,
		nick : peticion.body.nick,
		contrasena : peticion.body.contrasena,
		idRol : peticion.body.idRol
	}
	
	Usuario.insertUsuario(usuario, function(error, data) {
		if(data && data.insertUsuario > 0) {
			respuesta.json({"Mensaje" : "Usuario Ingresado Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "No se ingreso el usuario"});
		}
	});
});

router.put('/api/usuario', function(peticion, respuesta) {
	var usuario = {
		idUsuario : peticion.body.idUsuario,
		nombre : peticion.body.nombre,
		apellido : peticion.body.apellido,
		nick : peticion.body.nick,
		contrasena : peticion.body.contrasena,
		idRol : peticion.body.idRol
	};
	
	Usuario.updateUsuario(usuario, function(error, dato) {
		if(typeof usuario !== 'undefined') {
			respuesta.json(usuario);
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/usuario/', function(peticion, respuesta) {
	var idUsuario = peticion.body.idUsuario;
	
	Usuario.deleteUsuario(idUsuario, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Usuario Eliminado Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar el usuario"});
		}
	});
});

module.exports = router;