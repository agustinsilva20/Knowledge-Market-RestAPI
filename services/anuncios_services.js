const db = require('../bd');

exports.createAnuncio = async function (new_anuncio) {
    
    try {
        // Condiciones previas

        // Verifico que todos los campos no esten vacios
        if (!new_anuncio.categoria || !new_anuncio.frecuencia || !new_anuncio.veces || !new_anuncio.modalidad || !new_anuncio.descripcion || !new_anuncio.precio || !new_anuncio.profesorID) {
            return {"error": "Faltan campos por rellenar"}
        }

        curso = new_anuncio
        console.log(new_anuncio)

        // Guardo el usuario
        const query = `INSERT INTO Curso (ProfesorID, Categoria, FrecuenciaSemanal, CantidadSemanas, Modalidad, Descripcion, Precio, Estado) VALUES (${curso.profesorID}, '${curso.categoria}', ${curso.frecuencia}, ${curso.veces},'${curso.modalidad}', '${curso.descripcion}', ${curso.precio}, 'PUBLICADO');`;
        const result = await db.run_query(query)

        return {"msg": "Anuncio creado con exito", error: null};

    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Anuncio")
    }
}


exports.changeEstado = async function (new_anuncio, estado) {
    
    try {
        // Condiciones previas

        // Verifico que todos los campos no esten vacios
        if ( !new_anuncio.cursoID || !new_anuncio.profesorID) {
            return {"error": "Faltan campos por rellenar"}
        }

        // Verifico que el curso corresponda a el profesor
        const query_curso = "SELECT * FROM Curso WHERE Curso.CURSOID = " + new_anuncio.cursoID + " AND Curso.PROFESORID = " + new_anuncio.profesorID
        const result_curso = await db.run_query(query_curso)
        if (!result_curso || result_curso.length == 0) {
            return {"error": "El curso no pertenece al profesor o no existe"}
        }

        // Elimino el anuncio 
        const query = `UPDATE Curso SET Curso.ESTADO = "${estado}" WHERE Curso.CURSOID = ${new_anuncio.cursoID}`;
        const result = await db.run_query(query)

        return {"msg": "Anuncio Eliminado con exito", error: null};

    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Anuncio")
    }
}

exports.getAnuncios = async function () {
    const query = `SELECT CursoID, CantidadSemanas, Categoria, Correo, Descripcion, FrecuenciaSemanal, Modalidad, Nombre, Precio FROM Curso JOIN Profesor ON Curso.PROFESORID = Profesor.PROFESORID WHERE Curso.ESTADO = 'PUBLICADO'`;
    const result = await db.run_query(query)
    return {"msg": result, error: null};

}

exports.getAnunciosByProfesor = async function (profesorID) {

    const query = `SELECT * FROM Curso WHERE Curso.PROFESORID = ${profesorID} And Curso.Estado != "ELIMINADO" `;
    const result = await db.run_query(query)
    return {"msg": result, error: null};
}

exports.updateAnuncio = async function (new_anuncio) {
    
    try {
        // Condiciones previas

        // Verifico que todos los campos no esten vacios
        if (!new_anuncio.categoria || !new_anuncio.frecuencia || !new_anuncio.veces || !new_anuncio.modalidad || !new_anuncio.descripcion || !new_anuncio.precio || !new_anuncio.profesorID)  {
            return {"error": "Faltan campos por rellenar"}
        }

        // Verifico que el curso corresponda a el profesor
        const query_curso = "SELECT * FROM Curso WHERE Curso.CURSOID = " + new_anuncio.cursoID + " AND Curso.PROFESORID = " + new_anuncio.profesorID
        const result_curso = await db.run_query(query_curso)
        if (!result_curso || result_curso.length == 0) {
            return {"error": "El curso no pertenece al profesor o no existe"}
        }

        // Actualizo VALUES (${curso.profesorID}, '${curso.categoria}', ${curso.frecuencia}, ${curso.veces},'${curso.modalidad}', '${curso.descripcion}', ${curso.precio}, 'PUBLICADO')
        curso = new_anuncio
        const query = `UPDATE Curso SET Curso.ESTADO = "PUBLICADO", Categoria = '${curso.categoria}', FrecuenciaSemanal = ${curso.frecuencia}, CantidadSemanas = ${curso.veces}, Modalidad = '${curso.modalidad}', Descripcion = '${curso.descripcion}', Precio = ${curso.precio} WHERE Curso.CURSOID = ${curso.cursoID}`;
        const result = await db.run_query(query)

        return {"msg": "Anuncio Actualizado con exito", error: null};

    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Actualizando Anuncio")
    }
}

exports.getAnuncioInfo = async function (cursoID) {
    // Obtengo info del curso
    const query = `SELECT * FROM Curso WHERE CURSOID = ${cursoID}`;
    const result = await db.run_query(query)

    // Obtengo comentarios
    const query2 = `SELECT Nombre, Comentario, Calificacion FROM Comentario WHERE CursoID = ${cursoID} AND Estado = 'PUBLICADO'`;
    const result2 = await db.run_query(query2)


    return {"info": result, comentarios: result2, error: null};


}

