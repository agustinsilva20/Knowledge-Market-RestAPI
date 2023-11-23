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
