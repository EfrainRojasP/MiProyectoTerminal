import { convertirRespuestaAObjeto, refectorizarFecha } from "../Ayudas/Ayudas.js";

export class VentasBD {
    conexionMYSQL;


    /**
     * Constructor el cual inicializa la conexion a la Base de datos
     * @param {ConexionVentasDB} conexion 
     * Referencia a la Base de datos de Ventas
     */
    constructor(conexion) {
        this.conexionMYSQL = conexion;
    }

    /**
     * Metodo que devuelve todas las ventas, dependiendo del GUID del gerente regional
     * @param {String} GUID GUID del gerente regional
     * @returns Devuelve TODAS las VENTAS
     */
    consultarTodasVentas(GUID) {
        //console.log("BD " + this.conexionMYSQL);
        return new Promise((resolve, reject) => {
            const stm = "CALL TodasLasVentas (?)";
            const query = this.conexionMYSQL.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                let result = convertirRespuestaAObjeto(results[0]);
                result = refectorizarFecha(result, 1);
                //console.log(refectorizarFecha(result, 1));
                return resolve(result);
            });
        });
    }

    insertarVenta(arrVentas){
        //console.log(arrVentas);
        //(fechaventa, cantidadVenta, FK_idSucursal_Entidad_Alcaldia, FK_idProducto_Sucursal)
        return new Promise((resolve, reject) => {
            const stm = "INSERT INTO venta (fechaventa, cantidadVenta, FK_idSucursal_Entidad_Alcaldia, FK_idProducto_Sucursal) VALUES ?";
            const query = this.conexionMYSQL.query(stm, [arrVentas], function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                return resolve(true);
            });
        });
    }

    /**
     * Metodo para saber cuales sucursales tiene a cargo el gerente regional o el encargado
     * @param {String} GUID GUID del gerente regional
     * @returns Las tiendas a cargao que tiene el Genrente Regional
     */
    consultarSucursalesACargo(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "CALL InformacionDeTiendas(?)";
            const query = this.conexionMYSQL.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                //console.log(results[0]["idSucursal"]);
                return resolve(result);
            });
        });
    }

    /**
     * Consulta las sucursales a cargo que tiene un empleado
     * @returns Devulve el id de las sucursales
     */
    consultarIdSucursalesAcargo(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "CALL idSucursalesAcargo(?)";
            const query = this.conexionMYSQL.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                //console.log(results[0]["idSucursal"]);
                return resolve(result);
            });
        });
    }

    /**
     * Metodo para saber en que municipio o alcadia estan las sucursales que tiene a cargo el
     * gerente regional o el encargardo
     * @param {String} GUID GUID del gerente regional
     * @returns Devulve el municipio o alcaldia de las sucursales que tiene a cargo al Gerente Regional
     */
    consultarSucursalesACargo_MunAlca(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "CALL UbicacionTiendas_Municipio(?)";
            const query = this.conexionMYSQL.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                //console.log(results[0]);
                return resolve(result);
            });
        });
    }

    /**
     * Metodo para saber en que entidad estan las sucursales que tiene a cargo el
     * gerente regional o el encargardo
     * @param {String} GUID GUID del gerente regional
     * @returns Devulve las entidades de las sucursales que tiene a cargo al Gerente Regional
     */
    consultarSucursalesACargo_Entidad(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "CALL UbicacionTiendas_Entidad(?)";
            const query = this.conexionMYSQL.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                //console.log(results[0]);
                return resolve(result);
            });
        });
    }

    /**
     * Metodo para saber cuales son los productos ventidos de cada sucursal que tiene a cargo el
     * gerente regional
     * @param {String} GUID GUID del gerente regional
     * @returns Devulve los productos en venta de las sucursales que tiene a cargo al Gerente Regional
     */
    consultarSucursalesACargo_ProductosVendidos(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "CALL ProductosVentidos_Sucursal(?)";
            const query = this.conexionMYSQL.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                //console.log(results[0]);
                return resolve(result);
            });
        });
    }

    /**
     * Metodo para saber cuales son los tipos productos ventidos de cada sucursal que tiene a cargo el
     * gerente regional
     * @param {String} GUID GUID del gerente regional
     * @returns Devuelve el tipo de producto que tiene en venta las sucursales que tiene a cargo al Gerente Regional
     */
    consultarSucursalesACargo_TipoProductosVendidos(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "CALL TipoProductosVentidos_Sucursal(?)";
            const query = this.conexionMYSQL.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                //console.log(results[0]);
                return resolve(result);
            });
        });
    }

    /**
     * Metodo para la consulta personalizada
     * @param {String} stm La consulta SQL que se hara a la vista "Ventas_Consultas"
     * @param {Array} arrArgumentos Los argumentos de la consulta
     * @returns Devulve el resultado de la consulta o false si no hay ninguna coicidencia
     */
    consultaPersonalizada(stm, arrArgumentos) {
        //console.log("CONSULTA" + stm);
        //console.log(arrArgumentos);

        return new Promise((resolve, reject) => {
            const query = this.conexionMYSQL.query(stm, arrArgumentos, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                let result = convertirRespuestaAObjeto(results);
                result = refectorizarFecha(result, 1);
                //console.log(result);
                return resolve(result);
            });
        });
    }

    /**
     * Consulta a la BD el id del encardo
     * @param {String} GUID 
     * @returns Devuelve el id del encargado
     * @returns o Falso si hubo un error
     */
    consultarIdSucursalEncargado(GUID){
        return new Promise((resolve, reject) => {
            const stm = "SELECT ObtenerIdSucursalEncargado(?)";
            const query = this.conexionMYSQL.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    //resolve(false);
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                //console.log(results[0]);
                return resolve(result[0]);
            });
        });
    }

    /**
     * Consulta a la BD el id del producto
     * @param {String} GUID 
     * @returns Devuelve el id del producto
     * @returns o Falso si hubo un error
     */
    obtenerIdProducto(array){
        return new Promise((resolve, reject) => {
            const stm = "SELECT ObtenerIdProductoSucursal(?, ?)";
            const query = this.conexionMYSQL.query(stm, array, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                if(result[0] === 0){
                    //console.log("ERROR");
                    return reject(error);
                }
                //console.log(results[0]);
                return resolve(result[0]);
            });
        });
    }



}