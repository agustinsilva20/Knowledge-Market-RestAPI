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

--

-- Tabla Profesor
CREATE TABLE Profesor (
  ProfesorID INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(30),
  Correo VARCHAR(30),
  Telefono INT,
  PasswordHash VARCHAR(100)
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
  Precio FLOAT,
  Promedio FLOAT
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

query_profesor = "CREATE TABLE IF NOT EXISTS Profesor ( ProfesorID INT PRIMARY KEY AUTO_INCREMENT, Nombre VARCHAR(30),Correo VARCHAR(30),Telefono INT, PasswordHash VARCHAR(100));"
query_curso = "CREATE TABLE IF NOT EXISTS Curso (CursoID INT PRIMARY KEY AUTO_INCREMENT,ProfesorID INT,FOREIGN KEY (ProfesorID) REFERENCES Profesor(ProfesorID),Categoria VARCHAR(15),FrecuenciaSemanal INT,CantidadSemanas INT,Modalidad VARCHAR(15),Descripcion VARCHAR(200),Precio FLOAT, Estado VARCHAR(10), Promedio FLOAT, Imagen VARCHAR(100));"
query_comentario = """
  CREATE TABLE IF NOT EXISTS Comentario (
    ComentarioID INT PRIMARY KEY AUTO_INCREMENT,
    CursoID INT,
    FOREIGN KEY (CursoID) REFERENCES Curso(CursoID),
    Nombre VARCHAR(30),
    Comentario VARCHAR(250),
    Calificacion INT,
    Estado VARCHAR(10)
  );
"""
query_contratacion = """
  CREATE TABLE IF NOT EXISTS Contratacion (
  ContratacionID INT PRIMARY KEY AUTO_INCREMENT,
  CursoID INT,
  FOREIGN KEY (CursoID) REFERENCES Curso(CursoID),
  Nombre VARCHAR(30),
  Telefono INT,
  Correo VARCHAR(30),
  Estado VARCHAR(10)
);
"""

def execute_sql_script(connection, script):
    try:
        cursor = connection.cursor()
        cursor.execute(script)
        connection.commit()
        print("Script SQL ejecutado correctamente.")
    except mysql.connector.Error as err:
        print(f"Error al ejecutar el script SQL: {err}")


try:
    connection = mysql.connector.connect(**db_config)
    execute_sql_script(connection, "DROP TABLE Contratacion;")
    execute_sql_script(connection, "DROP TABLE Comentario;")
    execute_sql_script(connection, "DROP TABLE Curso;")
    execute_sql_script(connection, "DROP TABLE Profesor;")
    execute_sql_script(connection, query_profesor)
    execute_sql_script(connection, query_curso)
    execute_sql_script(connection, query_comentario)
    execute_sql_script(connection, query_contratacion)

    # Cerrar la conexión antes de abrir otra para evitar problemas de caché
    connection.close()

    



except mysql.connector.Error as err:
    print(f"Error al conectar a la base de datos o al ejecutar el script: {err}")
finally:
    if connection.is_connected():
        connection.close()
        print("Conexión cerrada.")
