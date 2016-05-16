var express = require('express');
var router = express.Router();
var Materia = require('../model/materia');


router.get('/api/materia/',function(peticion, respuesta) {
	Materia.getMaterias(function(error, materias) {
		if(typeof materias !=='undefined') {
			respuesta.json(materias);
		}else{
			respuesta.json({"mensaje": "No hay materias"});
		}
	});
});

router.get('/api/materia/:idMateria', function(peticion, respuesta) {
	var idMateria = peticion.params.idMateria;
	if(!isNaN(idMateria)) {
		Materia.getMateria(idMateria, function(error, materia) {
			if(typeof materia !== 'undefined' && materia.length > 0) {
				respuesta.json(materia);
			} else {
				respuesta.json({"Mensaje" : "No existe materia"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idMateria debe ser numerico"});
	}
});

router.post('/api/materia', function(peticion, respuesta) {
	var materia = {
		idMateria : null,
		nombreMateria : peticion.body.nombreMateria
	};
	
	Materia.insertMateria(materia, function(error, data) {
		if(data && data.insertMateria > 0) {
			respuesta.json({"mensaje" : "Materia Ingresada Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la materia"});
		}
	});
});

router.put('/api/materia', function(peticion, respuesta) {
	var materia = {
		idMateria : peticion.body.idMateria,
		nombreMateria : peticion.body.nombreMateria
	};
	
	Materia.updateMateria(materia, function(error, dato) {
		if(typeof materia !== 'undefined') {
			respuesta.json({"Mensaje" : "Materia editada"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/materia', function(peticion, respuesta) {
	var idMateria = peticion.body.idMateria;
	
	Materia.deleteMateria(idMateria, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Materia Eliminada Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar la materia"});
		}
	});
});

module.exports = router;