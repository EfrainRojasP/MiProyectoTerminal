DROP DATABASE IF EXISTS DB_User_Login;
CREATE DATABASE DB_User_Login;
USE DB_User_Login;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '21350821Dd';

CREATE TABLE TipoUsuario (
	idTipoUsuario INT NOT NULL AUTO_INCREMENT,
    tipoUsuario VARCHAR(50) NOT NULL,
    PRIMARY KEY (idTipoUsuariO)
);

CREATE TABLE Usuario (
	idUsuario INT NOT NULL AUTO_INCREMENT,
    guidUsuaio VARCHAR(50) NOT NULL UNIQUE,
    nombreUsuario VARCHAR(50) NOT NULL,
    apPaternoUsuario VARCHAR(50) NOT NULL,
    apMaternoUsuario VARCHAR(50) NOT NULL,
    emailUsuario VARCHAR(50) NOT NULL,
    passUsuario VARCHAR(200) NOT NULL,
    FK_tipoUsuario INT NOT NULL,
    PRIMARY KEY(idUsuario),
    FOREIGN KEY (FK_tipoUsuario) REFERENCES TipoUsuario(idTipoUsuario)
);

DROP PROCEDURE IF EXISTS InsertarUsuario;

DELIMITER //
CREATE PROCEDURE InsertarUsuario(guidUsuaio VARCHAR(50), nombreUsuario VARCHAR(50),
	apPaternoUsuario VARCHAR(50), apMaternoUsuario VARCHAR(50), emailUsuario VARCHAR(50), passUsuario VARCHAR(200), FK_tipoUsuario INT)
BEGIN
	INSERT INTO Usuario VALUE (NULL, guidUsuaio, nombreUsuario, apPaternoUsuario, apMaternoUsuario,  emailUsuario, passUsuario, FK_tipoUsuario);
    INSERT INTO db_ventas.Empleado VALUE(NULL, guidUsuaio, nombreUsuario, apPaternoUsuario, apMaternoUsuario, FK_tipoUsuario);
    INSERT IGNORE db_reportes.Empleado VALUE(NULL, guidUsuaio, nombreUsuario, apPaternoUsuario, apMaternoUsuario, FK_tipoUsuario);
END
//
DELIMITER ;

INSERT INTO TipoUsuario VALUES (NULL, "Gerente Regional");
INSERT INTO TipoUsuario VALUES (NULL, "Encargado");
