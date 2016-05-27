var mysql = require('mysql');
var parametros = {
	host : 'sql5.freemysqlhosting.net',
	user : 'sql5121144',
	password : 'TmeqnJ6K5X',
	database : 'sql5121144'
}

var connection = mysql.createConnection(parametros);
var bimestreModel = {};

bimestreModel.getBimestres = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM bimestre',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

bimestreModel.getBimestre = function(idBimestre, callback) {
	if(connection) {
		var sql = 'SELECT * FROM bimestre WHERE idBimestre=' + idBimestre;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

bimestreModel.insertBimestre = function(bimestre, callback) {
	if(connection) {
		connection.query('INSERT INTO bimestre Set ?', bimestre,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertBimestre" : resultado.insertId});
			}
		});
	}
}

bimestreModel.updateBimestre = function(bimestre, callback) {
	if(connection) {
		connection.query('UPDATE bimestre SET nombreBimestre=? WHERE idBimestre=?', 
		[bimestre.nombreBimestre, bimestre.idBimestre],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, bimestre);
			}
		});
	}
}

bimestreModel.deleteBimestre = function(idBimestre, callback) {
	if(connection) {
		connection.query('DELETE FROM bimestre WHERE idBimestre=?',
		idBimestre,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = bimestreModel;