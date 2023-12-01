var Service = require('../services/anuncios_services');
const CloudinaryService = require('../services/cloudinary');

exports.getAnuncios = async function (req, res, next) {

    console.log("[INFO] Obteniendo anuncios")
    
    try{
        // Lista de anuncios
        var anuncios = await Service.getAnuncios()
        var anuncios_y_calificacion = []


        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo obtener los Anuncios"})

    }
}

exports.getAnuncioInfo = async function (req, res, next) {

    console.log("[INFO] Obteniendo anuncio")
    const id = req.params.idcurso
    try{
        var anuncio = await Service.getAnuncioInfo(id)
        if (anuncio.error) {
            return res.status(400).json({status: 400, message: anuncio.error})
        }
        return res.status(200).json({status: 200, info: anuncio.info, comentarios: anuncio.comentarios})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo obtener los Anuncios"})

    }
}

exports.getAnunciosByProfesor = async function (req, res, next) {

    console.log("[INFO] Obteniendo anuncios")
    try{
        var anuncios = await Service.getAnunciosByProfesor(req.userId)
        if (anuncios.error) {
            return res.status(400).json({status: 400, message: anuncios.error})
        }
        return res.status(200).json({status: 200, message: anuncios.msg})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo obtener los Anuncios"})

    }
}

exports.createAnuncio = async function (req, res, next) {

    console.log("[INFO] Creando nuevo anuncio")
    const fileBuffer = req.file.buffer; // LINEA NUEVA
    const urlImg = await CloudinaryService.uploadImage(fileBuffer); // LINEA NUEVA
    console.log("url image", urlImg)

    var Anuncio = {
        categoria: req.body.categoria,
        frecuencia: req.body.frecuencia,
        veces: req.body.veces,
        modalidad: req.body.modalidad,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        profesorID:req.userId,
        imagen:urlImg
    }
    
    console.log(Anuncio)


    try{
        var categorias = ["MUSICA", "MATEMATICA", "HISTORIA", "PROGRAMACION", "INGLES", "FISICA", "QUIMICA", "BIOLOGIA" ]
        if (!categorias.includes(Anuncio.categoria) ){
            return res.status(400).json({status: 400, message: "La categoria del anuncio no es valida"})
        }
        var new_anuncio = await Service.createAnuncio(Anuncio)
        if (new_anuncio.error) {
            return res.status(400).json({status: 400, message: new_anuncio.error})
        }
        return res.status(200).json({status: 200, message: "Anuncio creado con exito"})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo crear el Anuncio"})

    }


}

exports.eliminarAnuncio = async function (req, res, next) {
    console.log("[INFO] Eliminando anuncio") 
    var Anuncio = {
        cursoID: req.body.cursoID,
        profesorID:req.userId
    }
    try{
        var new_anuncio = await Service.changeEstado(Anuncio, "ELIMINADO")
        if (new_anuncio.error) {
            return res.status(400).json({status: 400, message: new_anuncio.error})
        }
        return res.status(200).json({status: 200, message: "Anuncio Eliminado con exito"})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo eliminar el Anuncio"})

    }


}


exports.despublicarAnuncio = async function (req, res, next) {
    console.log("[INFO] Eliminando anuncio") 
    var Anuncio = {
        cursoID: req.body.cursoID,
        profesorID:req.userId
    }
    try{
        var new_anuncio = await Service.changeEstado(Anuncio, "NOTPUBLISH")
        if (new_anuncio.error) {
            return res.status(400).json({status: 400, message: new_anuncio.error})
        }
        return res.status(200).json({status: 200, message: "Anuncio Despublicado con exito"})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo despublicar el Anuncio"})

    }


}

exports.republicarAnuncio = async function (req, res, next) {
    console.log("[INFO] Republicando anuncio") 
    var Anuncio = {
        cursoID: req.body.cursoID,
        profesorID:req.userId
    }
    try{
        var new_anuncio = await Service.changeEstado(Anuncio, "PUBLICADO")
        if (new_anuncio.error) {
            return res.status(400).json({status: 400, message: new_anuncio.error})
        }
        return res.status(200).json({status: 200, message: "Anuncio Republicado con exito"})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo respublicar el Anuncio"})

    }

}

exports.updateAnuncio = async function (req, res, next) {
    console.log("[INFO] Actualizando anuncio") 
    var Anuncio = {
        categoria: req.body.categoria,
        frecuencia: req.body.frecuencia,
        veces: req.body.veces,
        modalidad: req.body.modalidad,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        profesorID:req.userId,
        cursoID: req.body.cursoID,
    }


    try{
        var categorias = ["MUSICA", "MATEMATICA", "HISTORIA", "PROGRAMACION", "INGLES", "FISICA", "QUIMICA", "BIOLOGIA" ]
        if (!categorias.includes(Anuncio.categoria) ){
            return res.status(400).json({status: 400, message: "La categoria del anuncio no es valida"})
        }
        var new_anuncio = await Service.updateAnuncio(Anuncio)
        if (new_anuncio.error) {
            return res.status(400).json({status: 400, message: new_anuncio.error})
        }
        return res.status(200).json({status: 200, message: "Anuncio actualizado con exito"})

    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo Actualizar el Anuncio"})

    }

}
