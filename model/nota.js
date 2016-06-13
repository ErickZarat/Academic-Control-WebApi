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
		connection.query('SELECT * FROM nota n, actividad a, detalleAlumno d, grado g, seccion s, usuario u where a.idActividad=n.idActividad and u.idUsuario=d.idUsuario and d.idDetalleAlumno = n.idDetalleAlumno and g.idGrado = d.idGrado and d.idSeccion = s.idSeccion',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

notaModel.getNotabyActividad = function(idActividad, callback){
	if (connection){
		connection.query('SELECT * FROM nota n, actividad a, detalleAlumno d, grado g, seccion s, usuario u where a.idActividad=n.idActividad and u.idUsuario=d.idUsuario and d.idDetalleAlumno = n.idDetalleAlumno and g.idGrado = d.idGrado and d.idSeccion = s.idSeccion and a.idActividad='+idActividad,
		function(error, resultado){
			if (error){
				throw error;
			} else {
				callback(null, resultado);
			}
		});

	}
}

notaModel.getNota = function(idNota, callback) {
	if(connection) {
		var sql = 'SELECT * FROM nota n, actividad a, detalleAlumno d, grado g, seccion s, usuario u where a.idActividad=n.idActividad and u.idUsuario=d.idUsuario and d.idDetalleAlumno = n.idDetalleAlumno and g.idGrado = d.idGrado and d.idSeccion = s.idSeccion and idNota=' + idNota;
		connection.query(sql, function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, resultado);
			}
		});
	}
}

notaModel.getNotaUsuario =  function(idUsuario, callback){
	if (connection){
		var sql ='SELECT * FROM nota n, actividad a, detalleAlumno d, grado g, seccion s, usuario u where a.idActividad=n.idActividad and u.idUsuario=d.idUsuario and d.idDetalleAlumno = n.idDetalleAlumno and g.idGrado = d.idGrado and d.idSeccion = s.idSeccion and u.idUsuario=?;';
		connection.query(sql,idUsuario, function(error, resultado){
			if (error){
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