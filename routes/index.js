var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(peticion, respuesta) {
  respuesta.render('index', { title: 'Express' });
});

module.exports = router;
