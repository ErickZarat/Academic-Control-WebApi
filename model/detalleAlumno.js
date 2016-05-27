var mysql = require('mysql');
var parametros = {
	host : 'sql5.freemysqlhosting.net',
	user : 'sql5121144',
	password : 'TmeqnJ6K5X',
	database : 'sql5121144'
}

var connection = mysql.createConnection(parametros);
var detalleAlumnoModel = {};

detalleAlumnoModel.getDetalleAlumnos = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM detalleAlumno',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

detalleAlumnoModel.getDetalleAlumno = function(idDetalleAlumno, callback) {
	if(connection) {
		var sql = 'SELECT * FROM detalleAlumno WHERE idDetalleAlumno=' + idDetalleAlumno;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

detalleAlumnoModel.insertDetalleAlumno = function(detalleAlumno, callback) {
	if(connection) {
		connection.query('INSERT INTO detalleAlumno Set ?', detalleAlumno,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"insertDetalleAlumno" : resultado.insertId});
			}
		});
	}
}

detalleAlumnoModel.updateDetalleAlumno = function(detalleAlumno, callback) {
	if(connection) {
		connection.query('UPDATE detalleAlumno SET idUsuario=?, idGrado=?, idSeccion=? WHERE idDetalleAlumno=?', 
		[detalleAlumno.idUsuario, detalleAlumno.idGrado, detalleAlumno.idSeccion, detalleAlumno.idDetalleAlumno],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, detalleAlumno);
			}
		});
	}
}

detalleAlumnoModel.deleteDetalleAlumno = function(idDetalleAlumno, callback) {
	if(connection) {
		connection.query('DELETE FROM detalleAlumno WHERE idDetalleAlumno=?',
		idDetalleAlumno,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}


module.exports = detalleAlumnoModel;