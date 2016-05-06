var express = require('express');
var router = express.Router();
var Rol = require('../model/usuario');

router.get('/api/rol', function(peticion, respuesta){
	Rol.getRoles(function(error, usuarios){
		if (typeof usuarios !== 'undefined'){
			respuesta.json(usuarios);
		} else {
			respuesta.json({"mensaje":"No hay usuarios"});
		}
	});
});

router.get('/api/rol/:idRol', function(peticion, respuesta){
	var idRol = peticion.params.idRol;
	if (!isNaN(idRol)){
		Rol.getRol(idRol, function(error, rol){
			if(typeof rol !== 'undefined' && rol.length > 0){
				respuesta.json(rol);
			} else {
				respuesta.json({"mensaje":"No existe el rol"})
			}
		});
	} else {
		respuesta.json({"mensaje":"el idRol debe ser numerico"});
	}
});

router.post('/api/rol', function(peticion, respuesta){
	var rol = {
		idRol: null,
		nombreRol: peticion.body.nombreRol
	}
	Rol.insertRol(rol, function(error, resultado){
		if (resultado && resultado.insertRol > 0){
			respuesta.json({"mensaje":"Rol ingresado correctamente"});
		} else {
			respuesta.json({"mensaje":"No se ingreso el rol"})
		}
	});
});

router.put('/api/rol/', function(peticion, respuesta){
	var rol = {
		idRol: peticion.body.idRol,
		nombreRol:peticion.body.nombreRol
	}

	Rol.updateRol(rol, function(error, resultado){
		if (typeof rol !== 'undefined'){
			respuesta.json({"mensaje":"Rol editado"});
		} else {
			respuesta.json({"mensaje":"No se edito el rol"});
		}
	});
});

router.delete('/api/rol/', function(peticion, respuesta){
	var idRol = peticion.body.idRol;
	Rol.deleteRol(idRol, function(error, resultado){
		if (resultado && resultado.mensaje === 'Eliminado'){
			respuesta.json({"mensaje":"Rol eliminado correctamente"});
		} else{
			respuesta.json({"mensaje": "Hubo un error al eliminar"});
		}
	});
});

module.exports = router;