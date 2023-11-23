var express = require('express');
var router = express.Router();

var Authorization = require('../auth/auth');

var UserController = require('../controllers/user_controllers');
var AnunciosController = require('../controllers/anuncios_controllers');


// Rutas de Cuenta
router.post('/crearcuenta', UserController.createUser)
router.post('/login', UserController.loginUser)

// Rutas de Anuncios
router.post('/crearanuncio', Authorization, AnunciosController.createAnuncio)




// Export the Router
module.exports = router;
