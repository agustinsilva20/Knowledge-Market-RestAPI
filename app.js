//Express
var express = require('express');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');

//incorporo cors
var cors = require('cors');

//db
const mysql = require('mysql2');

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


// Configura la conexión a la base de datos MySQL : https://addons-sso.heroku.com/apps/0ab5ef59-1a20-40a5-a673-be6ad0e14ef5/addons/f61644e4-9ef6-40ed-8f4b-073446457698
const db = mysql.createConnection({
    host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'rcyow37oddjzvp09',
    password: 'wibq8yytonpu7i6l',
    database: 'hsnwsqxad1qj7w62'
});

// Conecta a la base de datos
db.connect(err => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos exitosa');
    }
});


// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('Servidor de ABM Users iniciado en el puerto ',port);
});


module.exports = app;




