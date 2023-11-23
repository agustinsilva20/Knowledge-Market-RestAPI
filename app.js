//Express
var express = require('express');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');

//incorporo cors
var cors = require('cors');



//importo router
var indexRouter = require('./routes/routes');

//instancio el servidor
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


//Indico las rutas de los endpoint
app.use('/api', indexRouter);


// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('Servidor de ABM Users iniciado en el puerto ',port);
});


module.exports = app;




