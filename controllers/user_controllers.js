var Service = require('../services/user_services');

// Saving the context of this module inside the _the variable
_this = this;

exports.createUser = async function (req, res, next) {

    console.log("[INFO] Creando usuario nuevo")

    var User = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: req.body.password,
        password2: req.body.password2
    }


    try{
        var new_user = await Service.createUser(User)
        if (new_user.error) {
            return res.status(400).json({status: 400, message: new_user.error})
        }
        token = new_user.token
        return res.status(200).json({status: 200, message: "Usuario creado con exito"})
        // Me falta enviarle el token al cliente

    } catch (e) {
        console.log(e)
        console.log("[ERROR] No se pudo crear el usuario")
        return res.status(400).json({status: 400, message: "No se pudo crear el personaje"})

    }


}