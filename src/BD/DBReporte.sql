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

#SELECT * from db_reportes.sucursal;

#SELECT *  from db_reportes.EmpleadoSucursal;



#INSERT INTO sucursal SELECT * FROM db_ventas.sucursal;


