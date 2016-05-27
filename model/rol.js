var mysql = require('mysql');
var parametros = {
	host : 'sql5.freemysqlhosting.net',
	user : 'sql5121144',
	password : 'TmeqnJ6K5X',
	database : 'sql5121144'
}

var connection = mysql.createConnection(parametros);
var rolModel = {};

rolModel.getRoles = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM rol',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

rolModel.getRol = function(idRol, callback) {
	if(connection) {
		var sql = 'SELECT * FROM rol WHERE idRol=' + idRol;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

rolModel.insertRol = function(rol, callback) {
	if(connection) {
		connection.query('INSERT INTO rol Set ?', rol,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertRol" : resultado.insertId});
			}
		});
	}
}

rolModel.updateRol = function(rol, callback) {
	if(connection) {
		connection.query('UPDATE rol SET nombreRol=? WHERE idRol=?', 
		[rol.nombreRol, rol.idRol],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, rol);
			}
		});
	}
}

rolModel.deleteRol = function(idRol, callback) {
	if(connection) {
		connection.query('DELETE FROM rol WHERE idRol=?',
		idRol,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = rolModel;