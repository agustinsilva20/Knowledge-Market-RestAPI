const db = require('../bd');
exports.getCalificaciones = async function (idprofesor) {
    const query = `SELECT Nombre, Comentario, Calificacion, Comentario.Estado FROM Curso  JOIN Comentario ON Comentario.CursoID = Curso.CursoID WHERE Curso.ProfesorID = ${idprofesor}`;
    const result = await db.run_query(query)
    return {"msg": result, error: null};

}

exports.createCalificacion = async function (cursoID, calificacion) {
    // Verifico que todos los campos no esten vacios
        if (!calificacion.nombre || !calificacion.comentario || !calificacion.calificacion || !calificacion.estado ) {
            return {"error": "Faltan campos por rellenar"}
        }

    const query = `INSERT INTO Comentario (CursoID, Nombre, Comentario, Calificacion, estado) VALUES (${cursoID}, '${calificacion.nombre}', '${calificacion.comentario}', ${calificacion.calificacion}, '${calificacion.estado}');`;
    const result = await db.run_query(query)
    return {"msg": "Calificacion creada con exito", error: null};
}


exports.updateCalificacion = async function (profesorID, calificacionID, newestado) {
    // Verifico que el curso corresponda a el profesor
    const query_curso = `SELECT * FROM Comentario JOIN Curso ON Comentario.CursoID = Curso.CursoID WHERE Comentario.ComentarioID = ${calificacionID} AND Curso.ProfesorID = ${profesorID} `
    const result_curso = await db.run_query(query_curso)
    if (!result_curso || result_curso.length == 0) {
        return {"error": "El curso no pertenece al profesor o no existe"}
    }

    const query = `UPDATE Comentario SET estado = '${newestado}' WHERE ComentarioID = ${calificacionID}`;
    const result2 = await db.run_query(query)

    return {"msg": "Calificacion actualizada con exito", error: null};
}