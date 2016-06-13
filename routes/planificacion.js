var express = require('express');
var router = express.Router();
var Planificacion = require('../model/planificacion');


router.get('/api/planificacion/',function(peticion, respuesta) {
	Planificacion.getPlanificaciones(function(error, planificaciones) {
		if(typeof planificaciones !=='undefined') {
			respuesta.json(planificaciones);
		}else{
			respuesta.json({"mensaje": "No hay planificaciones"});
		}
	});
});

router.get('/api/planificacion/profesor/:idProfesor', function(peticion, respuesta){
	Planificacion.getPlanificacionesProfesor(peticion.params.idProfesor, function(error, planificaciones){
		if (typeof planificaciones !== 'undefined'){
			respuesta.json(planificaciones);
		} else {
			respuesta.json({"mensaje": "el Profesor no tiene planificaciones o no es profesor"})
		}
	});
});

router.get('/api/planificacion/:idPlanificacion', function(peticion, respuesta) {
	var idPlanificacion = peticion.params.idPlanificacion;
	if(!isNaN(idPlanificacion)) {
		Planificacion.getPlanificacion(idPlanificacion, function(error, planificacion) {
			if(typeof planificacion !== 'undefined' && planificacion.length > 0) {
				respuesta.json(planificacion[0]);
			} else {
				respuesta.json({"Mensaje" : "No existe planificacion"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idPlanificacion debe ser numerico"});
	}
});

router.post('/api/planificacion', function(peticion, respuesta) {
	var planificacion = {
		idPlanificacion : null,
		idBimestre : peticion.body.idBimestre,
		idUsuario : peticion.body.idUsuario,
		competencia : peticion.body.competencia,
		idMateria : peticion.body.idMateria,
		idGrado : peticion.body.idGrado
	};
	
	Planificacion.insertPlanificacion(planificacion, function(error, data) {
		if(data && data.insertPlanificacion > 0) {
			respuesta.json({"mensaje" : "Planificacion Ingresada Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la Planificacion"});
		}
	});
});

router.put('/api/planificacion', function(peticion, respuesta) {
	var planificacion = {
		idPlanificacion : peticion.body.idPlanificacion,
		idBimestre : peticion.body.idBimestre,
		idUsuario : peticion.body.idUsuario,
		competencia : peticion.body.competencia,
		idMateria : peticion.body.idMateria,
		idGrado : peticion.body.idGrado
	};
	
	Planificacion.updatePlanificacion(planificacion, function(error, dato) {
		if(typeof planificacion !== 'undefined') {
			respuesta.json({"Mensaje" : "Planificacion editada"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/planificacion', function(peticion, respuesta) {
	var idPlanificacion = peticion.body.idPlanificacion;
	
	Planificacion.deletePlanificacion(idPlanificacion, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Planificacion Eliminada Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar la Planificacion"});
		}
	});
});

module.exports = router;