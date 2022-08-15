DROP DATABASE IF EXISTS db_ventas;
CREATE DATABASE db_ventas;
USE db_ventas;

CREATE TABLE TipoEmpleado (
	idTipoEmpleado INT NOT NULL AUTO_INCREMENT,
    tipoEmpleado VARCHAR(50) NOT NULL,
    PRIMARY KEY(idTipoEmpleado)
);

CREATE TABLE TipoProducto (
	idTipoProducto INT NOT NULL AUTO_INCREMENT,
    tipoProducto VARCHAR(50) NOT NULL,
    PRIMARY KEY (idTipoProducto)
);

CREATE TABLE Entidad (
	idEntidad INT NOT NULL AUTO_INCREMENT,
    nombreEntidad VARCHAR(200) NOT NULL,
    abreviaruraEntidad VARCHAR(10) NOT NULL,
    PRIMARY KEY(idEntidad)
);

CREATE TABLE Sucursal(
    idSucursal INT NOT NULL AUTO_INCREMENT,
    nombreSucursal VARCHAR(200) NOT NULL,
    direccionSucursal VARCHAR(200) NOT NULL,
    PRIMARY KEY(idSucursal)
);

CREATE TABLE Empleado(
	idEmpleado INT NOT NULL AUTO_INCREMENT,
    GUIDEmpleado VARCHAR(50) NOT NULL,
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

CREATE TABLE Municipio_Alcaldia(
	idMunicipio_Alcaldia INT NOT NULL AUTO_INCREMENT,
    nombreMun_Alc VARCHAR (200) NOT NULL,
    FK_idEntidad INT NOT NULL,
    PRIMARY KEY(idMunicipio_Alcaldia),
    FOREIGN KEY(FK_idEntidad) REFERENCES Entidad(idEntidad)
);

CREATE TABLE Sucursal_Entidad_Alcaldia(
	idSucursal_Entidad_Alcaldia INT NOT NULL AUTO_INCREMENT,
    FK_idSucursal INT NOT NULL,
    FK_idEntidad INT NOT NULL,
    FK_idMunicipio_Alcaldia INT NOT NULL,
    PRIMARY KEY(idSucursal_Entidad_Alcaldia),
    FOREIGN KEY(FK_idSucursal) REFERENCES Sucursal(idSucursal),
    FOREIGN KEY(FK_idEntidad) REFERENCES Entidad(idEntidad),
    FOREIGN KEY(FK_idMunicipio_Alcaldia) REFERENCES Municipio_Alcaldia(idMunicipio_Alcaldia)
);

CREATE TABLE Producto(
	idProducto INT NOT NULL AUTO_INCREMENT,
    codigoProducto VARCHAR(50) NOT NULL,
    nombreProducto VARCHAR(200) NOT NULL,
    FK_idTipoProducto INT NOT NULL,
    PRIMARY KEY(idProducto),
    FOREIGN KEY(FK_idTipoProducto) REFERENCES TipoProducto(idTipoProducto)
);

CREATE TABLE Producto_Sucursal(
	idProducto_Sucursal INT NOT NULL AUTO_INCREMENT,
    costoProducto DOUBLE NOT NULL,
	FK_idProducto INT NOT NULL,
    FK_idSucursal INT NOT NULL,
    PRIMARY KEY(idProducto_Sucursal),
    FOREIGN KEY(FK_idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY(FK_idSucursal) REFERENCES Sucursal(idSucursal)
);

CREATE TABLE Almacen(
	idAlmacen INT NOT NULL AUTO_INCREMENT,
    FK_idProducto INT NOT NULL,
    cantidadProducto INT NOT NULL,
    FK_idSucursal_Entidad_Alcaldia INT NOT NULL,
    PRIMARY KEY(idAlmacen),
    FOREIGN KEY(FK_idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY(FK_idSucursal_Entidad_Alcaldia) REFERENCES Sucursal_Entidad_Alcaldia(idSucursal_Entidad_Alcaldia)
);

CREATE TABLE Venta (
	idVenta INT NOT NULL AUTO_INCREMENT,
    fechaventa DATE NOT NULL,
    cantidadVenta INT NOT NULL,
    FK_idSucursal_Entidad_Alcaldia INT NOT NULL,
    FK_idProducto_Sucursal INT NOT NULL,
    PRIMARY KEY(idVenta),
    FOREIGN KEY(FK_idSucursal_Entidad_Alcaldia) REFERENCES Sucursal_Entidad_Alcaldia(idSucursal_Entidad_Alcaldia),
    FOREIGN KEY(FK_idProducto_Sucursal) REFERENCES Producto_Sucursal(idProducto_Sucursal)
);

select * from entidad;

