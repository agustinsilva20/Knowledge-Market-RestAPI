const db = require('../bd');

exports.createAnuncio = async function (new_anuncio) {
    
    try {
        // Condiciones previas

        // Verifico que todos los campos no esten vacios
        if (!new_anuncio.categoria || !new_anuncio.frecuencia || !new_anuncio.veces || !new_anuncio.modalidad || !new_anuncio.descripcion || !new_anuncio.precio || !new_anuncio.profesorID) {
            return {"error": "Faltan campos por rellenar"}
        }

        curso = new_anuncio

        // Guardo el usuario
        const query = `INSERT INTO Curso (ProfesorID, Categoria, FrecuenciaSemanal, CantidadSemanas, Modalidad, Descripcion, Precio) VALUES (${curso.profesorID}, '${curso.categoria}', ${curso.frecuencia}, ${curso.veces},'${curso.modalidad}', '${curso.descripcion}', ${curso.precio});`;
        const result = await db.run_query(query)

        return {"msg": "Anuncio creado con exito", error: null};

    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Anuncio")
    }
}