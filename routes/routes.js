var express = require('express');
var router = express.Router();

var Authorization = require('../auth/auth');
var UserController = require('../controllers/user_controllers');



router.post('/crearcuenta', UserController.createUser)




// Export the Router
module.exports = router;
