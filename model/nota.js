var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : 'Progra15',
	database : 'controlAcademico'
}

var connection = mysql.createConnection(parametros);
var notaModel = {};

notaModel.getNotas = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM nota',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

notaModel.getNota = function(idNota, callback) {
	if(connection) {
		var sql = 'SELECT * FROM nota WHERE idNota=' + idNota;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

notaModel.insertNota = function(nota, callback) {
	if(connection) {
		connection.query('INSERT INTO nota Set ?', nota,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertNota" : resultado.insertId});
			}
		});
	}
}

notaModel.updateNota = function(nota, callback) {
	if(connection) {
		connection.query('UPDATE nota SET punteo=?, idActividad=?, idDetalleAlumno=? WHERE idNota=?', 
		[nota.punteo, nota.idActividad, nota.idDetalleAlumno, nota.idNota],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, nota);
			}
		});
	}
}

notaModel.deleteNota = function(idNota, callback) {
	if(connection) {
		connection.query('DELETE FROM nota WHERE idNota=?',
		idNota,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = notaModel;