const db = require('../bd');

exports.contratar = async function (Contratacion) {
    if (!Contratacion.idCurso || !Contratacion.nombre || !Contratacion.telefono || !Contratacion.correo || !Contratacion.estado  ) {
        return {"error": "Faltan campos por rellenar"}
    }

    const query = `INSERT INTO Contratacion (CursoID, Nombre, Telefono, Correo, Estado) VALUES (${Contratacion.idCurso}, '${Contratacion.nombre}', ${Contratacion.telefono}, '${Contratacion.correo}', '${Contratacion.estado}')`;
    const result = await db.run_query(query)
    return {"msg": "contratacion creada con exito", error: null};
}


exports.updateContratacion = async function (profesorID, contratacionID, newestado) {
    // Verifico que el curso corresponda a el profesor
    const query_curso = `SELECT * FROM Contratacion JOIN Curso ON Contratacion.CursoID = Curso.CursoID WHERE Contratacion.ContratacionID = ${contratacionID} AND Curso.ProfesorID = ${profesorID} `
    const result_curso = await db.run_query(query_curso)
    if (!result_curso || result_curso.length == 0) {
        return {"error": "El curso no pertenece al profesor o no existe"}
    }


    const query = `UPDATE Contratacion SET estado = '${newestado}' WHERE ContratacionID = ${contratacionID}`;
    const result2 = await db.run_query(query)
    return {"msg": "update exitoso", error: null};
}


exports.alumnosPendientes = async function (profesorID) {
    // Obtengo los pendientes
    const query = `SELECT ContratacionID, Curso.CursoID, Nombre, Telefono, Correo, Contratacion.Estado FROM Contratacion JOIN Curso ON Contratacion.CursoID = Curso.CursoID WHERE Contratacion.Estado = 'PENDIENTE' AND Curso.ProfesorID = ${profesorID}`
    const result = await db.run_query(query)
    return {"msg": result, error: null};
}

exports.getAlumnos = async function (profesorID) {
    // Obtengo los pendientes
    const query = `SELECT ContratacionID, Curso.CursoID, Curso.Categoria, Nombre, Telefono, Correo, Contratacion.Estado FROM Contratacion JOIN Curso ON Contratacion.CursoID = Curso.CursoID WHERE Curso.ProfesorID = ${profesorID} AND (Contratacion.Estado = 'PENDIENTE' OR Contratacion.Estado = 'ACTIVO' OR Contratacion.Estado = 'FIN') `
    const result = await db.run_query(query)
    return {"msg": result, error: null};
}