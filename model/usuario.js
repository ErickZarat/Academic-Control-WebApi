var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : 'Progra15',
	database : 'controlAcademico'
}

var connection = mysql.createConnection(parametros);
var usuarioModel = {};

usuarioModel.autenticar = function(usuario, callback){
	if (connection) {
		connection.query('SELECT * FROM usuario WHERE nick=? and contrasena=?',
			[usuario.nick, usuario.contrasena],
			function(error, resultado){
				if(error){
					throw error;
				}else {
					var res = {};
					if (resultado[0] == undefined){
						res.login = false;
					} else {
						res = resultado[0];
						res.login = true;	
					}
					
					callback(null, res);
				}
			});
	}
}

usuarioModel.getUsuarios = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM usuario u , rol r WHERE u.idRol = r.idRol',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

usuarioModel.getUsuariosDetalle = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM usuario u , rol r, detalleAlumno d WHERE u.idRol = r.idRol and d.idUsuario=u.idUsuario',
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});	
	}
}

usuarioModel.getUsuario = function(idUsuario, callback) {
	var id = connection.escape(idUsuario);
	var sql = 'SELECT * FROM usuario u INNER JOIN rol rol ON u.idRol = rol.idRol where u.idUsuario = ' + id; 
	
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

usuarioModel.getProfesores = function(callback) {
	var sql = 'SELECT u.idUsuario, u.nombre, u.apellido, u.nick, u.contrasena, u.idRol, rol.nombreRol FROM usuario u INNER JOIN rol rol ON u.idRol = rol.idRol where u.idRol = 1'; 
	
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

usuarioModel.getProfesor = function(idUsuario, callback){

	var sql = 'SELECT u.idUsuario, u.nombre, u.apellido, u.nick, u.contrasena, u.idRol, u.idRol, rol.nombreRol FROM usuario u INNER JOIN rol rol ON u.idRol = rol.idRol where u.idRol = 1 and u.idUsuario='+idUsuario; 

	connection.query(sql, function(error, resultado){
		if (error){
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

usuarioModel.getAlumnos = function(callback) {
	var sql = 'SELECT * FROM usuario u, rol r, detalleAlumno d, grado g, seccion s WHERE u.idRol = 2 and d.idUsuario = u.idUsuario and g.idGrado = d.idGrado and u.idRol = r.idRol and s.idSeccion = d.idSeccion'; 
	
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

usuarioModel.insertUsuario = function(usuario, callback){
	if(connection) {
		connection.query('INSERT INTO usuario SET ?', usuario, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertUsuario": resultado.insertId});
			}
		});
	}
}

usuarioModel.updateUsuario = function(usuario, callback) {
	if(connection) {
		connection.query('UPDATE usuario SET nombre= ? ,apellido=? ,nick=? ,contrasena=? ,idRol=? where idUsuario=?',
		[usuario.nombre, usuario.apellido, usuario.nick, usuario.contrasena, usuario.idRol, usuario.idUsuario],
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, usuario);
			}
		});
	}
}

usuarioModel.deleteUsuario = function(idUsuario, callback) {
	if(connection) {
		connection.query('DELETE FROM usuario WHERE idUsuario=?',
		idUsuario,
		function(error, resultado) {
			if(error) {
				throw error;
			} else {
				callback(null, {"Mensaje" : "Eliminado"});
			}
		});
	}
}

module.exports = usuarioModel;