var mysql = require('mysql');
var parametros = {
	host : 'sql5.freemysqlhosting.net',
	user : 'sql5121144',
	password : 'TmeqnJ6K5X',
	database : 'sql5121144'
}
var connection = mysql.createConnection(parametros);
var detalleMateriaModel = {};

detalleMateriaModel.getDetalleMaterias = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM detalleMateria',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

detalleMateriaModel.getDetalleMateria = function(idDetalleMateria, callback) {
	if(connection) {
		var sql = 'SELECT * FROM detalleMateria WHERE idDetalleMateria=' + idDetalleMateria;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

detalleMateriaModel.insertDetalleMateria = function(detalleMateria, callback) {
	if(connection) {
		connection.query('INSERT INTO detalleMateria Set ?', detalleMateria,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertDetalleMateria" : resultado.insertId});
			}
		});
	}
}

detalleMateriaModel.updateDetalleMateria = function(detalleMateria, callback) {
	if(connection) {
		connection.query('UPDATE detalleMateria SET idMateria=?, idUsuario=? WHERE idDetalleMateria=?', 
		[detalleMateria.idMateria, detalleMateria.idUsuario, detalleMateria.idDetalleMateria],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, detalleMateria);
			}
		});
	}
}

detalleMateriaModel.deleteDetalleMateria = function(idDetalleMateria, callback) {
	if(connection) {
		connection.query('DELETE FROM detalleMateria WHERE idDetalleMateria=?',
		idDetalleMateria,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = detalleMateriaModel;