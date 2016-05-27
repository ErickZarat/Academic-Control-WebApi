var mysql = require('mysql');
var parametros = {
	host : 'sql5.freemysqlhosting.net',
	user : 'sql5121144',
	password : 'TmeqnJ6K5X',
	database : 'sql5121144'
}

var connection = mysql.createConnection(parametros);
var materiaModel = {};

materiaModel.getMaterias = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM materia',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

materiaModel.getMateria = function(idMateria, callback) {
	if(connection) {
		var sql = 'SELECT * FROM materia WHERE idMateria=' + idMateria;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

materiaModel.insertMateria = function(materia, callback) {
	if(connection) {
		connection.query('INSERT INTO materia Set ?', materia,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertMateria" : resultado.insertId});
			}
		});
	}
}

materiaModel.updateMateria = function(materia, callback) {
	if(connection) {
		connection.query('UPDATE materia SET nombreMateria=? WHERE idMateria=?', 
		[materia.nombreMateria, materia.idMateria],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, materia);
			}
		});
	}
}

materiaModel.deleteMateria = function(idMateria, callback) {
	if(connection) {
		connection.query('DELETE FROM materia WHERE idMateria=?',
		idMateria,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = materiaModel;