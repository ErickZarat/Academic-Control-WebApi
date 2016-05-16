var express = require('express');
var router = express.Router();
var Seccion = require('../model/seccion');


router.get('/api/seccion/',function(peticion, respuesta) {
	Seccion.getSecciones(function(error, secciones) {
		if(typeof secciones !=='undefined') {
			respuesta.json(secciones);
		}else{
			respuesta.json({"mensaje": "No hay secciones"});
		}
	});
});

router.get('/api/seccion/:idSeccion', function(peticion, respuesta) {
	var idSeccion = peticion.params.idSeccion;
	if(!isNaN(idSeccion)) {
		Seccion.getSeccion(idSeccion, function(error, seccion) {
			if(typeof seccion !== 'undefined' && seccion.length > 0) {
				respuesta.json(seccion);
			} else {
				respuesta.json({"Mensaje" : "No existe seccion"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idSeccion debe ser numerico"});
	}
});

router.post('/api/seccion', function(peticion, respuesta) {
	var seccion = {
		idSeccion : null,
		nombreSeccion : peticion.body.nombreSeccion
	};
	
	Seccion.insertSeccion(seccion, function(error, data) {
		if(data && data.insertSeccion > 0) {
			respuesta.json({"mensaje" : "Seccion Ingresada Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la Seccion"});
		}
	});
});

router.put('/api/seccion', function(peticion, respuesta) {
	var seccion = {
		idSeccion : peticion.body.idSeccion,
		nombreSeccion : peticion.body.nombreSeccion
	};
	
	Seccion.updateSeccion(seccion, function(error, dato) {
		if(typeof seccion !== 'undefined') {
			respuesta.json({"Mensaje" : "Seccion editada"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/seccion/', function(peticion, respuesta) {
	var idSeccion = peticion.body.idSeccion;
	
	Seccion.deleteSeccion(idSeccion, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Seccion Eliminada Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar la Seccion"});
		}
	});
});

module.exports = router;