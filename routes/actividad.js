var express = require('express');
var router = express.Router();
var Actividad = require('../model/actividad');


router.get('/api/actividad/',function(peticion, respuesta) {
	Actividad.getActividades(function(error, actividades) {
		if(typeof actividades !=='undefined') {
			respuesta.json(actividades);
		}else{
			respuesta.json({"mensaje": "No hay actividades"});
		}
	});
});

router.get('/api/actividad/:idActividad', function(peticion, respuesta) {
	var idActividad = peticion.params.idActividad;
	if(!isNaN(idActividad)) {
		Actividad.getActividad(idActividad, function(error, actividad) {
			if(typeof actividad !== 'undefined' && actividad.length > 0) {
				respuesta.json(actividad);
			} else {
				respuesta.json({"Mensaje" : "No existe actividad"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idActividad debe ser numerico"});
	}
});

router.post('/api/actividad', function(peticion, respuesta) {
	var actividad = {
		idActividad : null,
		contenido : peticion.body.contenido,
		fechaInicial : peticion.body.fechaInicial,
		fechaFinal : peticion.body.fechaFinal,
		materiales : peticion.body.materiales,
		tareas : peticion.body.tareas,
		ponderacion : peticion.body.ponderacion,
		logro : peticion.body.logro,
		idPlanificacion : peticion.body.idPlanificacion
	};
	
	Actividad.insertActividad(actividad, function(error, data) {
		if(data && data.insertActividad > 0) {
			respuesta.json({"mensaje" : "Actividad Ingresada Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la Actividad"});
		}
	});
});

router.put('/api/actividad', function(peticion, respuesta) {
	var actividad = {
		idActividad : peticion.body.idActividad,
		contenido : peticion.body.contenido,
		fechaInicial : peticion.body.fechaInicial,
		fechaFinal : peticion.body.fechaFinal,
		materiales : peticion.body.materiales,
		tareas : peticion.body.tareas,
		ponderacion : peticion.body.ponderacion,
		logro : peticion.body.logro,
		idPlanificacion : peticion.body.idPlanificacion
	};
	
	Actividad.updateActividad(actividad, function(error, dato) {
		if(typeof actividad !== 'undefined') {
			respuesta.json({"Mensaje" : "Actividad editada"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/actividad', function(peticion, respuesta) {
	var idActividad = peticion.body.idActividad;
	
	Actividad.deleteActividad(idActividad, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Actividad Eliminada Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar la Actividad"});
		}
	});
});

module.exports = router;