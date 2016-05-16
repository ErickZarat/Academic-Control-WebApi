var express = require('express');
var router = express.Router();
var Bimestre = require('../model/bimestre');


router.get('/api/bimestre/',function(peticion, respuesta) {
	Bimestre.getBimestres(function(error, bimestres) {
		if(typeof bimestres !=='undefined') {
			respuesta.json(bimestres);
		}else{
			respuesta.json({"mensaje": "No hay bimestres"});
		}
	});
});

router.get('/api/bimestre/:idBimestre', function(peticion, respuesta) {
	var idBimestre = peticion.params.idBimestre;
	if(!isNaN(idBimestre)) {
		Bimestre.getBimestre(idBimestre, function(error, bimestre) {
			if(typeof bimestre !== 'undefined' && bimestre.length > 0) {
				respuesta.json(bimestre);
			} else {
				respuesta.json({"Mensaje" : "No existe bimestre"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idBimestre debe ser numerico"});
	}
});

router.post('/api/bimestre', function(peticion, respuesta) {
	var bimestre = {
		idBimestre : null,
		nombreBimestre : peticion.body.nombreBimestre
	};
	
	Bimestre.insertBimestre(bimestre, function(error, data) {
		if(data && data.insertBimestre > 0) {
			respuesta.json({"mensaje" : "Bimestre Ingresado Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso el bimestre"});
		}
	});
});

router.put('/api/bimestre', function(peticion, respuesta) {
	var bimestre = {
		idBimestre : peticion.body.idBimestre,
		nombreBimestre : peticion.body.nombreBimestre
	};
	
	Bimestre.updateBimestre(bimestre, function(error, dato) {
		if(typeof bimestre !== 'undefined') {
			respuesta.json({"Mensaje" : "bimestre editado"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/bimestre/', function(peticion, respuesta) {
	var idBimestre = peticion.body.idBimestre;
	
	Bimestre.deleteBimestre(idBimestre, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "Bimestre Eliminado Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar el Bimestre"});
		}
	});
});

module.exports = router;