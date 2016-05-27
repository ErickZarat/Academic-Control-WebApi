var mysql = require('mysql');
var parametros = {
	host : 'sql5.freemysqlhosting.net',
	user : 'sql5121144',
	password : 'TmeqnJ6K5X',
	database : 'sql5121144'
}

var connection = mysql.createConnection(parametros);
var actividadModel = {};

actividadModel.getActividades = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM actividad',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

actividadModel.getActividadPlan = function(idPlanificacion, callback){
	if(connection){
		var sql ='SELECT a.idActividad,a.contenido,a.fechaInicial,a.fechaFinal,a.materiales,a.tareas,a.ponderacion,a.logro,a.idPlanificacion FROM actividad a, planificacion p where a.idPlanificacion = p.idPlanificacion and a.idPlanificacion=?;';
		connection.query(sql,idPlanificacion, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

actividadModel.getActividad = function(idActividad, callback) {
	if(connection) {
		var sql = 'SELECT * FROM actividad WHERE idActividad=' + idActividad;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

actividadModel.insertActividad = function(actividad, callback) {
	if(connection) {
		connection.query('INSERT INTO actividad Set ?', actividad,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertActividad" : resultado.insertId});
			}
		});
	}
}

actividadModel.updateActividad = function(actividad, callback) {
	if(connection) {
		connection.query('UPDATE actividad SET contenido=?, fechaInicial=?, fechaFinal=?, materiales=?, tareas=?, ponderacion=?, logro=? WHERE idActividad=?', 
		[actividad.contenido, actividad.fechaInicial, actividad.fechaFinal, actividad.materiales, actividad.tareas, actividad.ponderacion, actividad.logro, actividad.idActividad],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, actividad);
			}
		});
	}
}

actividadModel.deleteActividad = function(idActividad, callback) {
	if(connection) {
		connection.query('DELETE FROM actividad WHERE idActividad=?',
		idActividad,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = actividadModel;