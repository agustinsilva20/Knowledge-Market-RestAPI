const mysql = require('mysql2/promise');

exports.run_query = async function (query, values = []) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'rcyow37oddjzvp09',
            password: 'wibq8yytonpu7i6l',
            database: 'hsnwsqxad1qj7w62'
        });

        const [rows] = await connection.execute(query, values);
        console.log(`Consulta ejecutada correctamente. Filas afectadas: ${rows.affectedRows}`);
        return rows;
    } catch (error) {
        console.error(`Error al ejecutar la consulta: ${error.message}`);
        throw error; // Propaga el error para que pueda ser manejado externamente si es necesario
    } finally {
        if (connection) {
            connection.end(); // Cierra la conexión en cualquier caso (éxito o error)
        }
    }
};
