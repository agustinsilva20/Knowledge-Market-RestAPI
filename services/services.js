// Gettign the Newly created Mongoose Model we just created 
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const db = require('../bd');

exports.getuser_by_email = async function (mail) {
    query = `SELECT * FROM Profesor WHERE Correo = '${mail}'`
    const savedUser = await db.run_query(query)
    try{
        return savedUser[0]
    }catch(e){
        return null
    }
    
}

exports.createUser = async function (new_user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(new_user.password, 8);
    
    try {
        // Condiciones previas

        // Verifico que todos los campos no esten vacios
        if (!new_user.nombre || !new_user.correo || !new_user.telefono || !new_user.password || !new_user.password2) {
            return {"error": "Faltan campos por rellenar"}
        }

        // Verifico que el mail no este registrado
        mail = await this.getuser_by_email(new_user.correo)
        if(mail){
            return {"error": "El mail ya esta registrado"}
        }

        // Verifico las passwords coincidan
        if (new_user.password != new_user.password2) {
            return {"error": "Las passwords no coinciden"}
        }

        // Guardo el usuario
        query = `INSERT INTO Profesor (Nombre, Correo, Telefono, PasswordHash) VALUES ('${new_user.nombre}', '${new_user.correo}',${new_user.telefono}, '${hashedPassword}')`
        const result = await db.run_query(query)

        // Obtengo el usuario
        savedUser = await this.getuser_by_email(new_user.correo)
        console.log(savedUser)
        user_id = savedUser.ProfesorID

        
        var token = jwt.sign({
            id: user_id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        
        return {"token": token, "error": null};
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}