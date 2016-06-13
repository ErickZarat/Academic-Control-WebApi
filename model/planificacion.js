var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : 'Progra15',
	database : 'controlAcademico'
}
var connection = mysql.createConnection(parametros);
var planificacionModel = {};

planificacionModel.getPlanificaciones = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM planificacion p, usuario u, grado g, materia m, bimestre b, rol r WHERE u.idUsuario = p.idUsuario AND p.idGrado = g.idGrado AND m.idMateria = p.idMateria AND b.idBimestre = p.idBimestre AND r.idRol = u.idRol' ,
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
		var sql = 'SELECT * FROM planificacion p, usuario u, grado g, materia m, bimestre b, rol r WHERE u.idUsuario = p.idUsuario AND p.idGrado = g.idGrado AND m.idMateria = p.idMateria AND b.idBimestre = p.idBimestre AND r.idRol = u.idRol and p.idUsuario=?;';
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
		var sql = 'SELECT * FROM planificacion p, usuario u, grado g, materia m, bimestre b, rol r WHERE u.idUsuario = p.idUsuario AND p.idGrado = g.idGrado AND m.idMateria = p.idMateria AND b.idBimestre = p.idBimestre AND r.idRol = u.idRol AND idPlanificacion=' + idPlanificacion;
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
