var Service = require('../services/user_services');
const MailService = require('../services/mail');

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
            console.log(new_user.error)
            return res.status(400).json({status: 400, message: new_user.error})
        }
        token = new_user.token
        console.log("creado!")

        // Notifico por mail
        await MailService.sendMail(
            User.correo,
            'Bienvenido a Knowledge',
            `Bienvenido a la aplicacion Knowledge!`)
        

        return res.status(200).json({status: 200, message: "Usuario creado con exito", token: new_user.token, idCuenta: new_user.id})
        // Me falta enviarle el token al cliente

    } catch (e) {
        console.log(e)
        console.log("[ERROR] No se pudo crear el usuario")
        return res.status(400).json({status: 400, message: "No se pudo crear el personaje"})

    }


}


exports.loginUser = async function (req, res, next) {

    console.log("[INFO] Intentando login de usuario")

    var User = {
        correo: req.body.correo,
        password: req.body.password,
    }


    try{
        var login_user = await Service.loginUser(User.correo, User.password)
        if (login_user.error) {
            return res.status(400).json({status: 400, message: login_user.error})
        }
        user = login_user.user
        // Me falta enviarle el token al cliente
        token = login_user.token
        return res.status(200).json({status: 200, token: login_user.token, idCuenta: user })

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo iniciar sesion"})

    }


}

exports.recuperarPassword = async function (req, res, next) {

    console.log("[INFO] Intentando recuperar password")
    var mail = req.body.correo

    try{
        var recuperar_password = await Service.recuperarPassword(mail)
        if (recuperar_password.error) {
            return res.status(400).json({status: 400, message: recuperar_password.error})
        }
        console.log("codigo", recuperar_password.codigo, " Mail: " , recuperar_password.mail)

        // Enviar el mail
        await MailService.sendMail(
            recuperar_password.mail,
            'Codigo de recupero de password',
            `Ingrese el codigo: ${recuperar_password.codigo}`)

        return res.status(200).json({status: 200, message: "ok"})
    }
    catch (e){
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo recuperar el password"})
    }

}

exports.recuperarPasswordDos = async function (req, res, next) {

    console.log("[INFO] Intentando cambiar password")
    var mail = req.body.correo
    var codigo = req.body.codigo
    var password = req.body.password

    try{
        var recuperar_password = await Service.recuperarPasswordDos(mail,codigo,password)
        if (recuperar_password.error) {
            return res.status(400).json({status: 400, message: recuperar_password.error})
        }
    
        // Enviar el mail
        await MailService.sendMail(
            req.body.correo,
            'Cambio de contraseña exitoso',
            `Se cambio su password correctamente`)

        return res.status(200).json({status: 200, message: "ok"})
    }
    catch (e){
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo recuperar el password"})
    }



}