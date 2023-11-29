var Service = require('../services/contrataciones_services');

exports.contratarAlumno = async function (req, res, next) {
    // fUNCION PARA ANOTARSE A UN CURSIO
    console.log("[INFO] Contratando Alumno")
    const idCurso = req.params.idcurso;

    Contratacion ={
        idCurso: idCurso,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        correo: req.body.correo,
        estado: "PENDIENTE"

    }

    try{
        var anuncios = await Service.contratar(Contratacion)
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo Contratar curso"})

    }}

exports.aceptarAlumno = async function (req, res, next) {
    const userid = req.userId;
    const idContratacion = req.params.idContratacion
    try{
        var anuncios = await Service.updateContratacion(userid, idContratacion, "ACTIVO")
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo Aceptar al alumno"})

    }
}

exports.rechazarAlumno = async function (req, res, next) {
    const userid = req.userId;
    const idContratacion = req.params.idContratacion
    try{
        var anuncios = await Service.updateContratacion(userid, idContratacion, "RECHAZO")
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo Rechazar al alumno"})

    }
}

exports.finalizarAlumno = async function (req, res, next) {
    const userid = req.userId;
    const idContratacion = req.params.idContratacion
    try{
        var anuncios = await Service.updateContratacion(userid, idContratacion, "FIN")
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo Finalizar al alumno"})

    }
}


exports.alumnosPendientes = async function (req, res, next) {
    const profesorID = req.userId
    try{
        var new_anuncio = await Service.alumnosPendientes(profesorID)
        if (new_anuncio.error) {
            return res.status(400).json({status: 400, message: new_anuncio.error})
        }
        return res.status(200).json({status: 200, message: new_anuncio.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo obtener el listado de alumnos pendientes"})

    }
}

exports.getAlumnos = async function (req, res, next) {
    const profesorID = req.userId
    try{
        var new_anuncio = await Service.getAlumnos(profesorID)
        if (new_anuncio.error) {
            return res.status(400).json({status: 400, message: new_anuncio.error})
        }
        return res.status(200).json({status: 200, message: new_anuncio.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo obtener el listado de alumnos pendientes"})

    }
}








