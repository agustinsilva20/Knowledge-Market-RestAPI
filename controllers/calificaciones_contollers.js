var Service = require('../services/calificaciones_services');

exports.getCalificaciones = async function (req, res, next) {

    console.log("[INFO] Obteniendo calificaciones")
    try{
        const docente = req.params.id;
        var anuncios = await Service.getCalificaciones(docente)
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo obtener las calificaciones"})

    }
}

exports.aceptarCalificacion = async function (req, res, next) {
    console.log("[INFO] Aceptando calificacion")
    const userid = req.userId;
    const calificacion = req.params.idCalificacion
    try{
        var anuncios = await Service.updateCalificacion(userid, calificacion, "PUBLICADO")
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo ACTUALIZAR las calificaciones"})

    }


}

exports.rechazarCalificacion = async function (req, res, next) {
    console.log("[INFO] Aceptando calificacion")
    const userid = req.userId;
    const calificacion = req.params.idCalificacion
    try{
        var anuncios = await Service.updateCalificacion(userid, calificacion, "NO")
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo ACTUALIZAR las calificaciones"})

    }}




exports.createCalificacion = async function (req, res, next) {
    console.log("[INFO] prublicando calificacion")

    const curso = req.params.idcurso;

    var Calificacion = {
        categoria: req.body.categoria,
        cursoID: curso,
        nombre: req.body.nombre,
        calificacion: req.body.calificacion,
        comentario: req.body.comentario,
        estado: "PENDIENTE"
    }


    try{
        var anuncios = await Service.createCalificacion(curso, Calificacion)
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo obtener las calificaciones"})

    }
}



