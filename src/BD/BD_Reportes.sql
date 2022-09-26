DROP DATABASE IF EXISTS db_reportes;
CREATE DATABASE db_reportes;
USE db_reportes;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '21350821Dd';

CREATE TABLE TipoEmpleado (
	idTipoEmpleado INT NOT NULL AUTO_INCREMENT UNIQUE,
    tipoEmpleado VARCHAR(50) NOT NULL,
    PRIMARY KEY(idTipoEmpleado)
);

CREATE TABLE Sucursal(
    idSucursal INT NOT NULL AUTO_INCREMENT UNIQUE,
    nombreSucursal VARCHAR(200) NOT NULL,
    direccionSucursal VARCHAR(200) NOT NULL,
    PRIMARY KEY(idSucursal)
);

CREATE TABLE EstadoReporte(
	idEstadoReporte INT NOT NULL AUTO_INCREMENT UNIQUE,
    estadoReporte VARCHAR(200) NOT NULL,
    PRIMARY KEY(idEstadoReporte)
);

CREATE TABLE Reporte(
	idReporte INT NOT NULL AUTO_INCREMENT UNIQUE,
    GUIDReporte VARCHAR(50) NOT NULL UNIQUE,
    decripcionReporte VARCHAR(200) NOT NULL,
    fechaLimite DATE NOT NULL,
    PRIMARY KEY(idReporte)
);

CREATE TABLE Empleado(
	idEmpleado INT NOT NULL AUTO_INCREMENT UNIQUE,
    GUIDEmpleado VARCHAR(50) NOT NULL UNIQUE,
    nombreEmpleado VARCHAR(50) NOT NULL,
    apellidoPaEmpleado VARCHAR(50) NOT NULL,
    apellidoMaEmpleado VARCHAR(50) NOT NULL,
    FK_idTipoEmpleado INT NOT NULL,
    PRIMARY KEY(idEmpleado),
    FOREIGN KEY (FK_idTipoEmpleado) REFERENCES TipoEmpleado(idTipoEmpleado)
);

CREATE TABLE EmpleadoSucursal(
	idEmpleadoSucursal INT NOT NULL AUTO_INCREMENT,
    FK_idEmpleado INT NOT NULL,
    FK_idSucursal INT NOT NULL,
    PRIMARY KEY(idEmpleadoSucursal),
    FOREIGN KEY (FK_idEmpleado) REFERENCES Empleado(idEmpleado),
    FOREIGN KEY (FK_idSucursal) REFERENCES Sucursal(idSucursal)
);

CREATE TABLE Empleado_ReporteSolicitud(
	idERS INT NOT NULL AUTO_INCREMENT UNIQUE,
    FK_idEmpleadoGerente INT NOT NULL,
    FK_idReporte INT NOT NULL,
    fechaSolicitud DATE NOT NULL,
    PRIMARY KEY(idERS),
	FOREIGN KEY(FK_idEmpleadoGerente) REFERENCES Empleado(idEmpleado),
	FOREIGN KEY(FK_idReporte) REFERENCES Reporte(idReporte)
);

CREATE TABLE Empleado_Reporte_Estado(
	idERES INT NOT NULL AUTO_INCREMENT UNIQUE,
    FK_idEmpleadoSucursal INT NOT NULL,
    FK_idEstadoReporte INT NOT NULL,
    FK_idReporte INT NOT NULL,
    PRIMARY KEY(idERES),
    FOREIGN KEY(FK_idEmpleadoSucursal) REFERENCES EmpleadoSucursal(idEmpleadoSucursal),
    FOREIGN KEY(FK_idEstadoReporte) REFERENCES EstadoReporte(idEstadoReporte),
    FOREIGN KEY(FK_idReporte) REFERENCES Reporte(idReporte)
);

SELECT * FROM db_reportes.empleado;

INSERT INTO TipoEmpleado VALUES (NULL, "Gerente Regional");
INSERT INTO TipoEmpleado VALUES (NULL, "Encargado");

INSERT INTO EstadoReporte VALUES (NULL, "Entregado");
INSERT INTO EstadoReporte VALUES (NULL, "No entregado");
INSERT INTO EstadoReporte VALUES (999, "No aplica");

INSERT INTO db_reportes.empleado SELECT * FROM db_ventas.empleado;
INSERT INTO db_reportes.sucursal SELECT * FROM db_ventas.sucursal;
INSERT INTO db_reportes.EmpleadoSucursal SELECT * FROM db_ventas.empleadosucursal;

####### VISTAS ##########
DROP VIEW IF EXISTS Reporte_Gerente;
/*Vista para saber las caracteristicas del reporte*/
CREATE VIEW Reporte_Gerente AS SELECT r.idReporte, r.GUIDReporte, r.decripcionReporte, r.fechaLimite, res1.idEmpleado, 
res1.GUIDEmpleado, res1.nombreEmpleado, res1.apellidoPaEmpleado, res1.apellidoMaEmpleado, res1.fechaSolicitud FROM reporte r 
	INNER JOIN (SELECT * FROM empleado e 
		INNER JOIN empleado_reportesolicitud ers ON e.idEmpleado = ers.FK_idEmpleadoGerente WHERE e.FK_idTipoEmpleado = 1) res1
    ON r.idReporte = res1.FK_idReporte;


DROP VIEW IF EXISTS Informacion_Reporte;
/*Vista que tiene la informacion del reporte */
CREATE VIEW Informacion_Reporte AS SELECT e.idEmpleado, e.GUIDEmpleado, ers.fechaSolicitud, r.idReporte, r.GUIDReporte, r.decripcionReporte, r.fechaLimite /***/ FROM empleado e 
	INNER JOIN empleado_reportesolicitud ers ON e.idEmpleado = ers.FK_idEmpleadoGerente
    INNER JOIN reporte r ON r.idReporte = ers.FK_idReporte;


DROP VIEW IF EXISTS Informacion_Reporte_Entrega;
/*Vista que tiene la informacoion del reporte, quien si y quien no ha entregado*/
CREATE VIEW Informacion_Reporte_Entrega AS SELECT res1.idEmpleado, res1.GUIDEmpleado, ir.idReporte, 
	ir.GUIDReporte, ir.fechaLimite,res1.nombreSucursal, res1.direccionSucursal, er.idEstadoReporte ,er.estadoReporte, ere.ideres  
	FROM Informacion_Reporte ir
	INNER JOIN Empleado_Reporte_Estado ere ON ir.idReporte = ere.FK_idReporte
    INNER JOIN EstadoReporte er ON er.idEstadoReporte = ere.FK_idEstadoReporte
    INNER JOIN (SELECT e.idEmpleado, e.GUIDEmpleado, es.idEmpleadoSucursal, s.* FROM empleado e 
		INNER JOIN empleadosucursal es ON e.idEmpleado = es.FK_idEmpleado
		INNER JOIN sucursal s ON s.idSucursal = es.FK_idSucursal) res1
	ON res1.idEmpleadoSucursal = ere.FK_idEmpleadoSucursal;

####### FUNCIONES ###########
DROP FUNCTION IF EXISTS ObtenerIdUsuaio;
DELIMITER //
/*Obtiene el ID del usuario*/
CREATE FUNCTION ObtenerIdUsuaio(GUIEmpleado VARCHAR(50)) RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
	DECLARE idEmp INT UNSIGNED;
	SET idEmp = (SELECT idEmpleado FROM Empleado WHERE GUIDEmpleado = GUIEmpleado);
	IF idEmp IS NULL 
		THEN SET idEmp = 0;
	END IF;
	RETURN idEmp;
END
//
DELIMITER ;

DROP FUNCTION IF EXISTS ObtenerIdReporte;
DELIMITER //
/*Ontiene el id del reporte creado por el Gerente regional*/
CREATE FUNCTION ObtenerIdReporte(GUIDR VARCHAR(50)) RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
	DECLARE idRep INT UNSIGNED;
	SET idRep = (SELECT idReporte FROM reporte WHERE GUIDReporte = GUIDR);
	IF idRep IS NULL 
		THEN SET idRep = 0;
	END IF;
	RETURN idRep;
END
//
DELIMITER ;

DROP FUNCTION IF EXISTS ObtenerElUltimoIdReporte;
/*Obtiene el id del utltmo reporte que solicito el gerente*/
DELIMITER //
CREATE FUNCTION ObtenerElUltimoIdReporte(GUIEmpleado VARCHAR(50)) RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
	DECLARE idEmp INT UNSIGNED;
    DECLARE idReporteGerente INT UNSIGNED;
	SET idEmp = (SELECT idEmpleado FROM Empleado WHERE GUIDEmpleado = GUIEmpleado);
    SET idReporteGerente = (SELECT max(idReporte) FROM Informacion_Reporte WHERE idEmpleado = idEmp);
	IF idReporteGerente IS NULL 
		THEN SET idReporteGerente  = 0;
	END IF;
	RETURN idReporteGerente;
END
//
DELIMITER ;

DROP FUNCTION IF EXISTS ObtenerCantidadReportes;
/*Nos dice cuantos reporte hay*/
DELIMITER //
CREATE FUNCTION ObtenerCantidadReportes (GUIDGerente VARCHAR(50)) RETURNS INT 
READS SQL DATA
NOT DETERMINISTIC
BEGIN
	DECLARE idReporteR INT UNSIGNED;
    DECLARE cantidadReporte INT UNSIGNED;
	SET idReporteR = (SELECT ObtenerElUltimoIdReporte(GUIDGerente));
    SET cantidadReporte = (SELECT count(*) FROM Informacion_Reporte_Entrega WHERE idReporte = idReporteR);
    RETURN cantidadReporte;
END
//
DELIMITER ;

DROP FUNCTION IF EXISTS ObtenerCantidadReportesEntregados;
/*Nos dice cuantos reportes han entregado*/
DELIMITER //
CREATE FUNCTION ObtenerCantidadReportesEntregados (GUIDGerente VARCHAR(50)) RETURNS INT 
READS SQL DATA
NOT DETERMINISTIC
BEGIN
	DECLARE idReporteR INT UNSIGNED;
    DECLARE cantidadReporte INT UNSIGNED;
	SET idReporteR = (SELECT ObtenerElUltimoIdReporte(GUIDGerente));
    SET cantidadReporte = (SELECT count(*) FROM Informacion_Reporte_Entrega WHERE idReporte = idReporteR AND idEstadoReporte = 1);
    RETURN cantidadReporte;
END
//
DELIMITER ;

DROP FUNCTION IF EXISTS ObtenerIdEmpRepSuc;
/*Obtenemos el id del la tabla empleado_reporte_sucursal, la cual nos indica cuales usuarios han y no han entragado el reporte*/
DELIMITER //
CREATE FUNCTION ObtenerIdEmpRepSuc(GUIDEncargado VARCHAR(50)) RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
	BEGIN
		DECLARE idERS INT UNSIGNED;
        SET idERS = (SELECT ideres FROM Informacion_Reporte_Entrega WHERE GUIDEmpleado = GUIDEncargado ORDER BY idReporte DESC LIMIT 1);
		 IF idERS IS NULL 
			 THEN SET idERS = 0;
		 END IF;
        RETURN idERS;
    END
//
DELIMITER ;
	
DROP FUNCTION IF EXISTS ObtenerEstadoReporteEncargado;
DELIMITER //
/*Nos da el id del estado del reporte, esto lo hacemos para saber el (un) encargado ya subio el reporte*/
CREATE FUNCTION ObtenerEstadoReporteEncargado(GUIDEncargado VARCHAR(50)) RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
	BEGIN
		DECLARE edoRepor INT UNSIGNED;
        SET edoRepor = (SELECT idEstadoReporte FROM Informacion_Reporte_Entrega WHERE GUIDEmpleado = GUIDEncargado ORDER BY ideres DESC LIMIT 1);
		IF edoRepor IS NULL 
			 THEN SET edoRepor = 0;
		 END IF;
        RETURN edoRepor;
    END
//
DELIMITER ;

DROP FUNCTION IF EXISTS FechaLimiteReporteEncargado;
DELIMITER //
CREATE FUNCTION FechaLimiteReporteEncargado (GUID VARCHAR(50)) RETURNS VARCHAR(50)
READS SQL DATA
NOT DETERMINISTIC
	BEGIN
		DECLARE fechaLimite VARCHAR(50);
        SET fechaLimite = (SELECT fechaLimite FROM Informacion_Reporte_Entrega WHERE GUIDEmpleado = "gUQXs0uj9HWkSHNzkiEc" ORDER BY ideres DESC LIMIT 1);
        IF fechaLimite IS NULL 
			 THEN SET fechaLimite = 0;
		 END IF;
        RETURN fechaLimite;
    END
//
DELIMITER ;

##################################################### PROCEDIMIENTOS #################################################################################
DROP PROCEDURE IF EXISTS InsertarReporte;
DELIMITER //
/*Inserta un reporte en la tabla reporte y la tabla empleado_reportesolicitud*/
CREATE PROCEDURE InsertarReporte(GUIDGerente VARCHAR(50), fechaSolicitud DATE, GUIDReporte VARCHAR(50), descReporte VARCHAR(200), fechaLimite DATE)
BEGIN
	DECLARE idEmp INT UNSIGNED;
    DECLARE idRpo INT UNSIGNED;
    SET idEmp = (SELECT ObtenerIdUsuaio(GUIDGerente));
    INSERT INTO reporte VALUES (NULL, GUIDReporte, descReporte, fechaLimite);
    SET idRpo = (SELECT ObtenerIdReporte(GUIDReporte));
    INSERT INTO empleado_reportesolicitud VALUES (NULL, idEmp, idRpo, fechaSolicitud);
END
//
DELIMITER ;

DROP PROCEDURE IF EXISTS  InsertarReporteEncargado;
/*Insertar la solicitud de reporte*/
DELIMITER //
CREATE PROCEDURE InsertarReporteEncargado(GUIDGerente VARCHAR(50), GUIDReporte VARCHAR(50))
BEGIN
	DECLARE idEmp INT UNSIGNED;
    DECLARE idReporte INT UNSIGNED;
    DECLARE length INT UNSIGNED DEFAULT 0;
	DECLARE counter INT UNSIGNED DEFAULT 0;
    SET idEmp = (SELECT ObtenerIdUsuaio(GUIDGerente));
    SET idReporte = (SELECT ObtenerIdReporte(GUIDReporte));
    SELECT COUNT(*) FROM (SELECT es.idEmpleadoSucursal FROM empleado e
		INNER JOIN empleadosucursal es on e.idEmpleado = es.FK_idempleado
		INNER JOIN (SELECT es.FK_idSucursal FROM empleado e
			INNER JOIN empleadosucursal es on e.idEmpleado = es.FK_idempleado WHERE e.idEmpleado = idEmp) res1
		ON res1.FK_idSucursal = es.FK_idSucursal WHERE e.FK_idTipoEmpleado = 2) AS c INTO length;
	SET counter=0;
    WHILE counter<length DO
	  INSERT INTO Empleado_Reporte_Estado
		VALUES (NULL, (SELECT es.idEmpleadoSucursal FROM empleado e
		INNER JOIN empleadosucursal es on e.idEmpleado = es.FK_idempleado
		INNER JOIN (SELECT es.FK_idSucursal FROM empleado e
			INNER JOIN empleadosucursal es on e.idEmpleado = es.FK_idempleado WHERE e.idEmpleado = idEmp) res1
		ON res1.FK_idSucursal = es.FK_idSucursal WHERE e.FK_idTipoEmpleado = 2 LIMIT counter,1), 2, idReporte);
	  SET counter = counter + 1;
	END WHILE;
END;
// 
DELIMITER ;

DROP PROCEDURE IF EXISTS InformacionReporte;
DELIMITER //
/*Proporciona la informacion del reporte*/
CREATE PROCEDURE InformacionReporte(GUIDEmpleado VARCHAR(50))
BEGIN
	DECLARE idReporteGerente INT UNSIGNED;
	SET idReporteGerente = (SELECT ObtenerElUltimoIdReporte(GUIDEmpleado));
    SELECT fechaSolicitud, GUIDReporte, decripcionReporte, fechaLimite FROM Informacion_Reporte WHERE idReporte = idReporteGerente;
END
//
DELIMITER ;

DROP PROCEDURE IF EXISTS InformacionReportesEntregados;
DELIMITER //
/*Proporciona la informacion para saber quien si y quien no ha entragado el reporte*/
CREATE PROCEDURE InformacionReportesEntregados(GUIDEmpleado VARCHAR(50))
BEGIN
	DECLARE idReporteGerente INT UNSIGNED;
	SET idReporteGerente = (SELECT ObtenerElUltimoIdReporte(GUIDEmpleado));
    SELECT estadoReporte, nombreSucursal, direccionSucursal FROM Informacion_Reporte_Entrega WHERE idReporte = idReporteGerente;
END
//
DELIMITER ;

        

