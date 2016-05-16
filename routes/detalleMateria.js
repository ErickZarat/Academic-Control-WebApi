var express = require('express');
var router = express.Router();
var DetalleMateria = require('../model/detalleMateria');


router.get('/api/detalleMateria/',function(peticion, respuesta) {
	DetalleMateria.getDetalleMaterias(function(error, detalleMaterias) {
		if(typeof detalleMaterias !=='undefined') {
			respuesta.json(detalleMaterias);
		}else{
			respuesta.json({"mensaje": "No hay detalleMaterias"});
		}
	});
});

router.get('/api/detalleMateria/:idDetalleMateria', function(peticion, respuesta) {
	var idDetalleMateria = peticion.params.idDetalleMateria;
	if(!isNaN(idDetalleMateria)) {
		DetalleMateria.getDetalleMateria(idDetalleMateria, function(error, detalleMateria) {
			if(typeof detalleMateria !== 'undefined' && detalleMateria.length > 0) {
				respuesta.json(detalleMateria);
			} else {
				respuesta.json({"Mensaje" : "No existe detalleMateria"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idDetalleMateria debe ser numerico"});
	}
});

router.post('/api/detalleMateria', function(peticion, respuesta) {
	var detalleMateria = {
		idDetalleMateria : null,
		idMateria : peticion.body.idMateria,
		idUsuario : peticion.body.idUsuario
	};
	
	DetalleMateria.insertDetalleMateria(detalleMateria, function(error, data) {
		if(data && data.insertDetalleMateria > 0) {
			respuesta.json({"mensaje" : "detalleMateria Ingresado Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso el detalleMateria"});
		}
	});
});

router.put('/api/detalleMateria', function(peticion, respuesta) {
	var detalleMateria = {
		idDetalleMateria : peticion.body.idDetalleMateria,
		idMateria : peticion.body.idMateria,
		idUsuario : peticion.body.idUsuario
	};
	
	DetalleMateria.updateDetalleMateria(detalleMateria, function(error, dato) {
		if(typeof detalleMateria !== 'undefined') {
			respuesta.json({"Mensaje" : "DetalleMateria editado"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/detalleMateria/', function(peticion, respuesta) {
	var idDetalleMateria = peticion.body.idDetalleMateria;
	
	DetalleMateria.deleteDetalleMateria(idDetalleMateria, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "detalleMateria Eliminado Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar el detalleMateria"});
		}
	});
});

module.exports = router;