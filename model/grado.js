var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : 'Progra15',
	database : 'controlAcademico'
}

var connection = mysql.createConnection(parametros);
var gradoModel = {};

gradoModel.getGrados = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM grado',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

gradoModel.getGrado = function(idGrado, callback) {
	if(connection) {
		var sql = 'SELECT * FROM grado WHERE idGrado=' + idGrado;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

gradoModel.insertGrado = function(grado, callback) {
	if(connection) {
		connection.query('INSERT INTO grado Set ?', grado,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertGrado" : resultado.insertId});
			}
		});
	}
}

gradoModel.updateGrado = function(grado, callback) {
	if(connection) {
		connection.query('UPDATE grado SET nombreGrado=? WHERE idGrado=?', 
		[grado.nombreGrado, grado.idGrado],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, grado);
			}
		});
	}
}

gradoModel.deleteGrado = function(idGrado, callback) {
	if(connection) {
		connection.query('DELETE FROM grado WHERE idGrado=?',
		idGrado,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = gradoModel;