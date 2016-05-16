var express = require('express');
var router = express.Router();
var Rol = require('../model/rol');


router.get('/api/rol/',function(peticion, respuesta) {
	Rol.getRoles(function(error, roles) {
		if(typeof roles !=='undefined') {
			respuesta.json(roles);
		}else{
			respuesta.json({"mensaje": "No hay roles"});
		}
	});
});

router.get('/api/rol/:idRol', function(peticion, respuesta) {
	var idRol = peticion.params.idRol;
	if(!isNaN(idRol)) {
		Rol.getRol(idRol, function(error, rol) {
			if(typeof rol !== 'undefined' && rol.length > 0) {
				respuesta.json(rol);
			} else {
				respuesta.json({"Mensaje" : "No existe rol"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idRol debe ser numerico"});
	}
});

router.post('/api/rol', function(peticion, respuesta) {
	var rol = {
		idRol : null,
		nombreRol : peticion.body.nombreRol
	};
	
	Rol.insertRol(rol, function(error, data) {
		if(data && data.insertRol > 0) {
			respuesta.json({"mensaje" : "Rol Ingresado Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso el rol"});
		}
	});
});

router.put('/api/rol', function(peticion, respuesta) {
	var rol = {
		idRol : peticion.body.idRol,
		nombreRol : peticion.body.nombreRol
	};
	
	Rol.updateRol(rol, function(error, dato) {
		if(typeof rol !== 'undefined') {
			respuesta.json({"Mensaje" : "Rol editado"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/rol/', function(peticion, respuesta) {
	var idRol = peticion.body.idRol;
	
	Rol.deleteRol(idRol, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Rol Eliminado Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar el rol"});
		}
	});
});

module.exports = router;