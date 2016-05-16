var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : 'Progra15',
	database : 'controlAcademico'
}

var connection = mysql.createConnection(parametros);
var seccionModel = {};

seccionModel.getSecciones = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM seccion',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

seccionModel.getSeccion = function(idSeccion, callback) {
	if(connection) {
		var sql = 'SELECT * FROM seccion WHERE idSeccion=' + idSeccion;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

seccionModel.insertSeccion = function(seccion, callback) {
	if(connection) {
		connection.query('INSERT INTO seccion Set ?', seccion,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertSeccion" : resultado.insertId});
			}
		});
	}
}

seccionModel.updateSeccion = function(seccion, callback) {
	if(connection) {
		connection.query('UPDATE seccion SET nombreSeccion=? WHERE idSeccion=?', 
		[seccion.nombreSeccion, seccion.idSeccion],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, seccion);
			}
		});
	}
}

seccionModel.deleteSeccion = function(idSeccion, callback) {
	if(connection) {
		connection.query('DELETE FROM seccion WHERE idSeccion=?',
		idSeccion,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = seccionModel;