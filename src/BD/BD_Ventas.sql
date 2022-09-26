DROP DATABASE IF EXISTS db_ventas;
CREATE DATABASE db_ventas;
USE db_ventas;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '21350821Dd';

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
    codigoProducto VARCHAR(50) NOT NULL UNIQUE,
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

INSERT INTO TipoEmpleado VALUES (NULL, "Gerente Regional");
INSERT INTO TipoEmpleado VALUES (NULL, "Encargado");

### VISTAS #############
drop view IF EXISTS Ventas_Cunsultas;

#Nos proporciona las TODAS las VENTAS
create VIEW Ventas_Cunsultas as
SELECT res.idEmpleado, v.fechaVenta, v.cantidadVenta, p.idProducto, p.nombreProducto, p.fk_idtipoProducto, tp.tipoProducto, P.costoProducto, v.FK_idSucursal_Entidad_Alcaldia, res.idSucursal, res.nombreSucursal, res.direccionSucursal, 
	res.FK_idEntidad, res.NOMBREENTIDAD, res.FK_IDMUNICIPIO_ALCALDIA, res.NOMBREMUN_ALC
    FROM VENTA V
	INNER JOIN (SELECT p.idProducto, P.NOMBREPRODUCTO, p.fk_idtipoProducto, PS.IDPRODUCTO_SUCURSAL, Ps.costoProducto, PS.FK_IDSUCURSAL FROM PRODUCTO P
				INNER JOIN PRODUCTO_SUCURSAL PS ON P.IDPRODUCTO = PS.FK_IDPRODUCTO) P
		ON V.FK_IDPRODUCTO_SUCURSAL = P.IDPRODUCTO_SUCURSAL
	INNER JOIN (SELECT e.idEmpleado, RES1.IDSUCURSAL_ENTIDAD_ALCALDIA, S.idSucursal, S.nombreSucursal, S.direccionSucursal, res1.FK_idEntidad, res1.NOMBREENTIDAD,
				res1.FK_IDMUNICIPIO_ALCALDIA, res1. NOMBREMUN_ALC
				FROM EMPLEADO E 
				INNER JOIN EMPLEADOSUCURSAL ES ON E.IDEMPLEADO = ES.FK_IDEMPLEADO
				INNER JOIN SUCURSAL S ON S.IDSUCURSAL = ES.FK_IDSUCURSAL 
				INNER JOIN (SELECT SEA.IDSUCURSAL_ENTIDAD_ALCALDIA, SEA.FK_IDSUCURSAL, SEA.FK_idEntidad, ET.NOMBREENTIDAD, SEA.FK_IDMUNICIPIO_ALCALDIA, MA.NOMBREMUN_ALC
								FROM SUCURSAL_ENTIDAD_ALCALDIA SEA 
								INNER JOIN ENTIDAD ET ON ET.IDENTIDAD = SEA.FK_IDENTIDAD
								INNER JOIN MUNICIPIO_ALCALDIA MA ON MA.IDMUNICIPIO_ALCALDIA = SEA.FK_IDMUNICIPIO_ALCALDIA) RES1
					ON RES1.FK_IDSUCURSAL = S.IDSUCURSAL WHERE E.FK_idtipoEmpleado = 1) RES
		ON RES.IDSUCURSAL_ENTIDAD_ALCALDIA = V.FK_IDSUCURSAL_ENTIDAD_ALCALDIA
	INNER JOIN tipoproducto tp on tp.idTipoProducto = p.fk_idtipoProducto;
        

drop VIEW IF EXISTS SucursalesACargo_Empleado;
#Nos proporciona todas las sucursales que tiene a cargo un emlpeado
create view SucursalesACargo_Empleado as
	SELECT e.idEmpleado, e.FK_idTipoEmpleado, RES1.IDSUCURSAL_ENTIDAD_ALCALDIA, S.idSucursal, S.nombreSucursal, S.direccionSucursal, res1.FK_idEntidad, res1.NOMBREENTIDAD,
				res1.FK_IDMUNICIPIO_ALCALDIA, res1. NOMBREMUN_ALC
				FROM EMPLEADO E 
				INNER JOIN EMPLEADOSUCURSAL ES ON E.IDEMPLEADO = ES.FK_IDEMPLEADO
				INNER JOIN SUCURSAL S ON S.IDSUCURSAL = ES.FK_IDSUCURSAL 
				INNER JOIN (SELECT SEA.IDSUCURSAL_ENTIDAD_ALCALDIA, SEA.FK_IDSUCURSAL, SEA.FK_idEntidad, ET.NOMBREENTIDAD, SEA.FK_IDMUNICIPIO_ALCALDIA, MA.NOMBREMUN_ALC
								FROM SUCURSAL_ENTIDAD_ALCALDIA SEA 
								INNER JOIN ENTIDAD ET ON ET.IDENTIDAD = SEA.FK_IDENTIDAD
								INNER JOIN MUNICIPIO_ALCALDIA MA ON MA.IDMUNICIPIO_ALCALDIA = SEA.FK_IDMUNICIPIO_ALCALDIA) RES1
					ON RES1.FK_IDSUCURSAL = S.IDSUCURSAL;


drop VIEW IF EXISTS producto_tipoproducto;
#Nos proporciona todos los productos y su tipo, que vende cada sucursal
create VIEW producto_tipoproducto as 
	select * from producto p 
		inner join tipoproducto tp on tp.idtipoproducto = p.fk_idtipoproducto
		inner join producto_sucursal ps on ps.fk_idProducto = p.idProducto;
        
        
########## Funciones ####################################################

DROP FUNCTION IF EXISTS ObtenerIdUsuaio;

#Nos proporciona el Id del Usuario a partir de su GUID
DELIMITER //
CREATE FUNCTION ObtenerIdUsuaio (GUID VARCHAR(50)) RETURNS INT
	READS SQL DATA
    NOT DETERMINISTIC
	BEGIN
		DECLARE idEmp INT UNSIGNED;
		SET idEmp = (SELECT idEmpleado FROM Empleado WHERE GUIDEmpleado = GUID);
        IF idEmp IS NULL 
			THEN SET idEmp = 0;
		END IF;
        RETURN idEmp;
    END
//
DELIMITER ;

DROP FUNCTION IF EXISTS ObtenerIdSucursalEntidadUsuario;
DELIMITER //
/*Obtiene el id de la tabla SucursalesACargo_Empleado*/
CREATE  FUNCTION ObtenerIdSucursalEntidadUsuario(GUID VARCHAR(50)) RETURNS INT
	READS SQL DATA
    NOT DETERMINISTIC
	BEGIN
		DECLARE idEmp INT UNSIGNED;
        DECLARE idSEA INT UNSIGNED;
		SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
		SET idSEA = (select IDSUCURSAL_ENTIDAD_ALCALDIA from SucursalesACargo_Empleado where idEmpleado = idEmp);
        IF idSEA IS NULL 
			THEN SET idSEA = 0;
		END IF;
        RETURN idSEA;
	END
//
DELIMITER ;

DROP FUNCTION IF EXISTS ObtenerIdSucursalEncargado;
/*Obtenemos le id de la sucurlsal de la que se encarga el encargado*/
DELIMITER //
CREATE FUNCTION ObtenerIdSucursalEncargado(GUID VARCHAR(50)) RETURNS INT
	READS SQL DATA
    NOT DETERMINISTIC
    BEGIN
		DECLARE idEmp INT UNSIGNED;
        DECLARE idSuc INT UNSIGNED;
		SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
		SET idSuc = (select idSucursal from SucursalesACargo_Empleado where idEmpleado = idEmp);
        IF idSuc IS NULL 
			THEN SET idSuc = 0;
		END IF;
        RETURN idSuc;
    END
//
DELIMITER ;

DROP FUNCTION IF EXISTS ObtenerIdProductoSucursal;
DELIMITER //
CREATE FUNCTION ObtenerIdProductoSucursal(GUID VARCHAR(50), nombreProducto VARCHAR(200)) RETURNS INT
	READS SQL DATA
    NOT DETERMINISTIC
    BEGIN
        DECLARE idSuc INT UNSIGNED;
        DECLARE idProdSuc INT UNSIGNED;
        SET idSuc = (SELECT ObtenerIdSucursalEncargado(GUID));
        SET idProdSuc = (SELECT ps.idProducto_Sucursal FROM producto_sucursal ps INNER JOIN producto p ON ps.FK_idProducto = p.idProducto
			WHERE p.nombreProducto = nombreProducto and FK_idSucursal = idSuc);
		IF idProdSuc IS NULL 
			THEN SET idProdSuc = 0;
		END IF;
        RETURN idProdSuc;
    END
//
DELIMITER ;

## PROCEDIMIENTOS ####################################################################

drop PROCEDURE IF EXISTS todasLasventas;
# Nos muestra Todas las ventas de las sucursales que tiene a cargo el Gerente regional
DELIMITER //
CREATE PROCEDURE TodasLasVentas (GUID VARCHAR(50))
	BEGIN
		DECLARE idEmp INT UNSIGNED;
		SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
        select fechaVenta, cantidadVenta, nombreProducto, costoProducto,  nombreSucursal, NOMBREENTIDAD, NOMBREMUN_ALC
			from Ventas_Cunsultas where idEmpleado = idEmp;
    END
//
DELIMITER ;

drop PROCEDURE IF EXISTS InformacionDeTiendas;
## Nos muestra la informacion de las tiendas que tiene a cargo el Gerente regional o un encargado
DELIMITER //
create PROCEDURE InformacionDeTiendas (GUID varchar (50))
	begin
		DECLARE idEmp INT UNSIGNED;
		SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
        select idSucursal, nombreSucursal, direccionSucursal, NOMBREENTIDAD, NOMBREMUN_ALC 
			from SucursalesACargo_Empleado where idEmpleado = idEmp;
	end
//
DELIMITER ;

drop procedure IF EXISTS UbicacionTiendas_Entidad;
# Nos muestra la entidad de las tiendas que tiene a cargo el Gernte Regional
DELIMITER //
create PROCEDURE UbicacionTiendas_Entidad(GUID VARCHAR(50))
BEGIN
	DECLARE idEmp INT UNSIGNED;
	SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
	select FK_idEntidad, NOMBREENTIDAD from SucursalesACargo_Empleado where idEmpleado = idEmp GROUP BY FK_idEntidad;
END
//
DELIMITER ;

drop procedure IF EXISTS UbicacionTiendas_Municipio;
# Nos muestra el municipio de las tiendas que tiene a cargo el Gernete Regional
DELIMITER //
create PROCEDURE UbicacionTiendas_Municipio(GUID VARCHAR(50))
BEGIN
	DECLARE idEmp INT UNSIGNED;
	SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
	select FK_IDMUNICIPIO_ALCALDIA, NOMBREMUN_ALC from SucursalesACargo_Empleado where idEmpleado = idEmp GROUP BY FK_IDMUNICIPIO_ALCALDIA;
END
//
DELIMITER ;

drop procedure  IF EXISTS ProductosVentidos_Sucursal;
#Nos muetra los productos que venden las tiendas que tiene a cargo el Gerente Regional
DELIMITER //
create PROCEDURE ProductosVentidos_Sucursal(GUID VARCHAR(50))
BEGIN
	DECLARE idEmp INT UNSIGNED;
    SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
    SELECT ptp.idProducto, ptp.nombreProducto from SucursalesACargo_Empleado sa
	inner join producto_tipoproducto ptp
	on ptp.FK_idSucursal = sa.idSucursal where sa.idEmpleado = idEmp GROUP BY ptp.idProducto;
END
//
DELIMITER ;

drop procedure IF EXISTS TipoProductosVentidos_Sucursal;
#Nos muestra el tipo de producto 1ue venden las tiendas que tiene a cargo el Gerente Regional
DELIMITER //
create PROCEDURE TipoProductosVentidos_Sucursal(GUID VARCHAR(50))
BEGIN
	DECLARE idEmp INT UNSIGNED;
    SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
    SELECT ptp.idTipoProducto, ptp.tipoProducto from SucursalesACargo_Empleado sa
	inner join producto_tipoproducto ptp
	on ptp.FK_idSucursal = sa.idSucursal where sa.idEmpleado = idEmp GROUP BY ptp.idTipoProducto;
END
//
DELIMITER ;

drop procedure IF EXISTS InformacionEmpleado;
#Nos mustra la el nombre del empleado (apP, apM, Nombres)
DELIMITER //
CREATE PROCEDURE InformacionEmpleado (GUID VARCHAR(50))
BEGIN
	DECLARE idEmp INT UNSIGNED;
    SET idEmp = (SELECT ObtenerIdUsuaio(GUID));
    SELECT apellidoPaEmpleado, apellidoMaEmpleado, nombreEmpleado FROM empleado WHERE idEmpleado = idEmp;
END
//
DELIMITER ;




