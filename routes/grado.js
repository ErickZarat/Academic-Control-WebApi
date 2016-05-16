var express = require('express');
var router = express.Router();
var Grado = require('../model/grado');


router.get('/api/grado/',function(peticion, respuesta) {
	Grado.getGrados(function(error, grados) {
		if(typeof grados !=='undefined') {
			respuesta.json(grados);
		}else{
			respuesta.json({"mensaje": "No hay grados"});
		}
	});
});

router.get('/api/grado/:idGrado', function(peticion, respuesta) {
	var idGrado = peticion.params.idGrado;
	if(!isNaN(idGrado)) {
		Grado.getGrado(idGrado, function(error, grado) {
			if(typeof grado !== 'undefined' && grado.length > 0) {
				respuesta.json(grado);
			} else {
				respuesta.json({"Mensaje" : "No existe grado"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idGrado debe ser numerico"});
	}
});

router.post('/api/grado', function(peticion, respuesta) {
	var grado = {
		idGrado : null,
		nombreGrado : peticion.body.nombreGrado
	};
	
	Grado.insertGrado(grado, function(error, data) {
		if(data && data.insertGrado > 0) {
			respuesta.json({"mensaje" : "Grado Ingresado Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso el Grado"});
		}
	});
});

router.put('/api/grado', function(peticion, respuesta) {
	var grado = {
		idGrado : peticion.body.idGrado,
		nombreGrado : peticion.body.nombreGrado
	};
	
	Grado.updateGrado(grado, function(error, dato) {
		if(typeof grado !== 'undefined') {
			respuesta.json({"Mensaje" : "Grado editado"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/grado/', function(peticion, respuesta) {
	var idGrado = peticion.body.idGrado;
	
	Grado.deleteGrado(idGrado, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Grado Eliminado Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar el Grado"});
		}
	});
});

module.exports = router;