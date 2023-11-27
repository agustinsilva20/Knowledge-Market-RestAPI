var express = require('express');
var router = express.Router();

var Authorization = require('../auth/auth');

var UserController = require('../controllers/user_controllers');
var AnunciosController = require('../controllers/anuncios_controllers');
var CalificacionesController = require('../controllers/calificaciones_contollers');


// Rutas de Cuenta
router.post('/crearcuenta', UserController.createUser)
router.post('/login', UserController.loginUser)

// Rutas de Anuncios
router.post('/crearanuncio', Authorization, AnunciosController.createAnuncio)
router.post('/eliminaranuncio', Authorization, AnunciosController.eliminarAnuncio)
router.post('/despublicaranuncio', Authorization, AnunciosController.despublicarAnuncio)
router.post('/republicaranuncio', Authorization, AnunciosController.republicarAnuncio)
router.post('/updateanuncio', Authorization, AnunciosController.updateAnuncio)
router.get('/getanuncios', AnunciosController.getAnuncios)
router.get("/getanuncioinfo/:idcurso", AnunciosController.getAnuncioInfo)
router.get('/getanunciosbyprofesor', Authorization, AnunciosController.getAnunciosByProfesor)


// Rutas de calificaciones
router.get('/getcalificaciones/:id', Authorization, CalificacionesController.getCalificaciones)
router.post('/createcalificacion/:idcurso', CalificacionesController.createCalificacion)



// Export the Router
module.exports = router;
