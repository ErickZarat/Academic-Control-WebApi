var express = require('express');
var router = express.Router();
var DetalleAlumno = require('../model/detalleAlumno');


router.get('/api/detalleAlumno/',function(peticion, respuesta) {
	DetalleAlumno.getDetalleAlumnos(function(error, detalleAlumnos) {
		if(typeof detalleAlumnos !=='undefined') {
			respuesta.json(detalleAlumnos);
		}else{
			respuesta.json({"mensaje": "No hay detalleAlumnos"});
		}
	});
});

router.get('/api/detalleAlumno/:idDetalleAlumno', function(peticion, respuesta) {
	var idDetalleAlumno = peticion.params.idDetalleAlumno;
	if(!isNaN(idDetalleAlumno)) {
		DetalleAlumno.getDetalleAlumno(idDetalleAlumno, function(error, detalleAlumno) {
			if(typeof detalleAlumno !== 'undefined' && detalleAlumno.length > 0) {
				respuesta.json(detalleAlumno);
			} else {
				respuesta.json({"Mensaje" : "No existe detalleAlumno"});
			}
		});
	} else {
		respuesta.json({"Mensaje" : "El idDetalleAlumno debe ser numerico"});
	}
});

router.post('/api/detalleAlumno', function(peticion, respuesta) {
	var detalleAlumno = {
		idDetalleAlumno : null,
		idUsuario : peticion.body.idUsuario,
		idGrado : peticion.body.idGrado,
		idSeccion : peticion.body.idSeccion
	};
	
	DetalleAlumno.insertDetalleAlumno(detalleAlumno, function(error, data) {
		if(data && data.insertDetalleAlumno > 0) {
			respuesta.json({"mensaje" : "detalleAlumno Ingresado Correctamente"});
		} else {
			respuesta.json({"mensaje" : "No se ingreso el detalleAlumno"});
		}
	});
});

router.put('/api/detalleAlumno', function(peticion, respuesta) {
	var detalleAlumno = {
		idDetalleAlumno : peticion.body.idDetalleAlumno,
		idUsuario : peticion.body.idUsuario,
		idGrado : peticion.body.idGrado,
		idSeccion : peticion.body.idSeccion
	};
	
	DetalleAlumno.updateDetalleAlumno(detalleAlumno, function(error, dato) {
		if(typeof detalleAlumno !== 'undefined') {
			respuesta.json({"Mensaje" : "DetalleAlumno editado"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de editar"});
		}
	});
});

router.delete('/api/detalleAlumno/', function(peticion, respuesta) {
	var idDetalleAlumno = peticion.body.idDetalleAlumno;
	
	DetalleAlumno.deleteDetalleAlumno(idDetalleAlumno, function(error, dato) {
		if(dato && dato.Mensaje === "Eliminado") {
			respuesta.json({"Mensaje" : "detalleAlumno Eliminado Correctamente"});
		} else {
			respuesta.json({"Mensaje" : "Hubo un error al momento de eliminar el detalleAlumno"});
		}
	});
});

module.exports = router;