var express = require('express');
var router = express.Router();
var Nota = require('../model/nota');


router.get('/api/nota/',function(peticion, respuesta) {
	Nota.getNotas(function(error, notas) {
		if(typeof notas !=='undefined') {
			respuesta.json(notas);
		}else{
			respuesta.json({"mensaje": "No hay notas"});
		}
	});
});

router.get('/api/nota/:idNota', function(peticion, respuesta) {
	var idNota = peticion.params.idNota;
	if(!isNaN(idNota)) {
		Nota.getNota(idNota, function(error, nota) {
			if(typeof nota !== 'undefined' && nota.length > 0) {
				respuesta.json(nota);
			} else {
				respuesta.json({"Mensaje" : "No existe nota"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idNota debe ser numerico"});
	}
});

router.post('/api/nota', function(peticion, respuesta) {
	var nota = {
		idNota : null,
		punteo : peticion.body.punteo,
		idActividad : peticion.body.idActividad,
		idDetalleAlumno : peticion.body.idDetalleAlumno
	};
	
	Nota.insertNota(nota, function(error, data) {
		if(data && data.insertNota > 0) {
			respuesta.json({"mensaje" : "Nota Ingresada Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la Nota"});
		}
	});
});

router.put('/api/nota', function(peticion, respuesta) {
	var nota = {
		idNota : peticion.body.idNota,
		punteo : peticion.body.punteo,
		idActividad : peticion.body.idActividad,
		idDetalleAlumno : peticion.body.idDetalleAlumno
	};
	
	Nota.updateNota(nota, function(error, dato) {
		if(typeof nota !== 'undefined') {
			respuesta.json({"Mensaje" : "nota editada"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/nota/', function(peticion, respuesta) {
	var idNota = peticion.body.idNota;
	
	Nota.deleteNota(idNota, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Nota Eliminada Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar la Nota"});
		}
	});
});

module.exports = router;