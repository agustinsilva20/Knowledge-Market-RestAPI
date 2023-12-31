var express = require('express');
var router = express.Router();

var Authorization = require('../auth/auth');

var UserController = require('../controllers/user_controllers');
var AnunciosController = require('../controllers/anuncios_controllers');
var CalificacionesController = require('../controllers/calificaciones_contollers');
var ContratacionesController = require('../controllers/contrataciones_controllers');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas de Cuenta
router.post('/crearcuenta', UserController.createUser)
router.post('/login', UserController.loginUser)
router.post("/recuperar", UserController.recuperarPassword)
router.post("/recuperarDos", UserController.recuperarPasswordDos)

// Rutas de Anuncios
router.post('/crearanuncio', Authorization, upload.single('imagen'), AnunciosController.createAnuncio)
router.post('/eliminaranuncio', Authorization, AnunciosController.eliminarAnuncio)
router.post('/despublicaranuncio', Authorization, AnunciosController.despublicarAnuncio)
router.post('/republicaranuncio', Authorization, AnunciosController.republicarAnuncio)
router.post('/updateanuncio', Authorization, AnunciosController.updateAnuncio)
router.get('/getanuncios', AnunciosController.getAnuncios)
router.get("/getanuncioinfo/:idcurso", AnunciosController.getAnuncioInfo)
router.get('/getanunciosbyprofesor', Authorization, AnunciosController.getAnunciosByProfesor)


// Rutas de calificaciones
router.get('/getcalificaciones/', Authorization, CalificacionesController.getCalificaciones)
router.post('/createcalificacion/:idcurso', CalificacionesController.createCalificacion)
router.post('/aceptarCalificacion/:idCalificacion', Authorization, CalificacionesController.aceptarCalificacion)
router.post('/rechazarCalificacion/:idCalificacion', Authorization, CalificacionesController.rechazarCalificacion)

// Rutas de Alumnos
router.post("/contratarCurso/:idcurso", ContratacionesController.contratarAlumno)
router.post("/aceptarAlumno/:idContratacion", Authorization, ContratacionesController.aceptarAlumno)
router.post("/rechazarAlumno/:idContratacion", Authorization, ContratacionesController.rechazarAlumno)
router.post("/finalizarAlumno/:idContratacion", Authorization, ContratacionesController.finalizarAlumno)
router.get("/alumnosPendientes", Authorization, ContratacionesController.alumnosPendientes) // Alumnos con estado pendiente
router.get("/getAlumnos", Authorization, ContratacionesController.getAlumnos) // Alumnos activos o finalizados



// Export the Router
module.exports = router;
