import mysql.connector

# Configuración de la conexión a la base de datos
db_config = {
    'host': 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    'user': 'rcyow37oddjzvp09',
    'password': 'wibq8yytonpu7i6l',
    'database': 'hsnwsqxad1qj7w62'
}

# Script SQL
sql_script = """
-- Tabla Profesor
CREATE TABLE Profesor (
  ProfesorID INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(30),
  Correo VARCHAR(30),
  Telefono INT,
  PasswordHash VARCHAR(50)
);

-- Tabla Curso
CREATE TABLE Curso (
  CursoID INT PRIMARY KEY AUTO_INCREMENT,
  ProfesorID INT,
  FOREIGN KEY (ProfesorID) REFERENCES Profesor(ProfesorID),
  Categoria VARCHAR(15),
  FrecuenciaSemanal INT,
  CantidadSemanas INT,
  Modalidad VARCHAR(15),
  Descripcion VARCHAR(200),
  Precio FLOAT
);

-- Tabla Comentario
CREATE TABLE Comentario (
  ComentarioID INT PRIMARY KEY AUTO_INCREMENT,
  CursoID INT,
  FOREIGN KEY (CursoID) REFERENCES Curso(CursoID),
  Nombre VARCHAR(30),
  Comentario VARCHAR(250),
  Calificacion INT,
  Estado VARCHAR(10)
);

-- Tabla Contratacion
CREATE TABLE Contratacion (
  ContratacionID INT PRIMARY KEY AUTO_INCREMENT,
  CursoID INT,
  FOREIGN KEY (CursoID) REFERENCES Curso(CursoID),
  Nombre VARCHAR(30),
  Telefono INT,
  Correo VARCHAR(30),
  Estado VARCHAR(10)
);
"""

# Función para ejecutar el script SQL
def execute_sql_script(connection, script):
    try:
        cursor = connection.cursor()
        cursor.execute(script, multi=True)
        connection.commit()
        print("Script SQL ejecutado correctamente.")
    except mysql.connector.Error as err:
        print(f"Error al ejecutar el script SQL: {err}")
    finally:
        if cursor:
            cursor.close()

# Conexión a la base de datos
try:
    connection = mysql.connector.connect(**db_config)
    execute_sql_script(connection, sql_script)
except mysql.connector.Error as err:
    print(f"Error al conectar a la base de datos: {err}")
finally:
    if connection.is_connected():
        connection.close()
        print("Conexión cerrada.")
