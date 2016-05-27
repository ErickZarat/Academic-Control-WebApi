var mysql = require('mysql');
var parametros = {
	host : 'sql5.freemysqlhosting.net',
	user : 'sql5121144',
	password : 'TmeqnJ6K5X',
	database : 'sql5121144'
}

var connection = mysql.createConnection(parametros);
var planificacionModel = {};

planificacionModel.getPlanificaciones = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM planificacion',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

planificacionModel.getPlanificacionesProfesor = function (idProfesor, callback){
	if (connection){
		var sql = 'SELECT p.idPlanificacion,p.idBimestre,p.idUsuario,p.competencia,p.idMateria,m.nombreMateria,p.idGrado,g.nombreGrado FROM planificacion p, materia m, grado g where p.idMateria = m.idMateria and p.idGrado=g.idGrado and p.idUsuario=?;';
		connection.query(sql, idProfesor, function(error, resultado){
			if (error){
				throw error;
			} else {
				callback(null, resultado)
			}
		});
	}
}

planificacionModel.getPlanificacion = function(idPlanificacion, callback) {
	if(connection) {
		var sql = 'SELECT * FROM planificacion WHERE idPlanificacion=' + idPlanificacion;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

planificacionModel.insertPlanificacion = function(planificacion, callback) {
	if(connection) {
		connection.query('INSERT INTO planificacion Set ?', planificacion,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertPlanificacion" : resultado.insertId});
			}
		});
	}
}

planificacionModel.updatePlanificacion = function(planificacion, callback) {
	if(connection) {
		connection.query('UPDATE planificacion SET idBimestre=?, idUsuario=?, competencia=?, idMateria=?, idGrado=? WHERE idPlanificacion=?', 
		[planificacion.idBimestre, planificacion.idUsuario, planificacion.competencia, planificacion.idMateria, planificacion.idGrado, planificacion.idPlanificacion],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, planificacion);
			}
		});
	}
}

planificacionModel.deletePlanificacion = function(idPlanificacion, callback) {
	if(connection) {
		connection.query('DELETE FROM planificacion WHERE idPlanificacion=?',
		idPlanificacion,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = planificacionModel;
