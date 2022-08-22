import { convertirRespuestaAObjeto } from "../Ayudas/Ayudas.js";

export class ConsultarVentas {
    conexionMYSQL;


    /**
     * 
     * @param {ConexionVentasDB} conexion
     * Referencia a la Base de datos de Ventas
     *  
     */
    constructor(conexion) {
        this.conexionMYSQL = conexion;
    }

    /**
     * 
     * @returns Devuelve TODAS las VENTAS
     */
    consultarTodasVentas(GUID) {
        console.log("BD " + this.conexionMYSQL);
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
                //console.log(results);
                const result = convertirRespuestaAObjeto(results[0]);
                console.log(result);
                return resolve(result);
            });
        });
    }
/**
 * 
 * @param {String} GUID GUID del gerente regional
 * @returns Las tiendas a cargao que tiene el Genrente Regional
 */
    consultarSucursalesACargo(GUID){
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
                console.log(results[0]["idSucursal"]);
                return resolve(result);
            });
        });
    }

    /**
     * 
     * @param {String} GUID GUID del gerente regional
     * @returns Devulve el municipio o alcaldia de las sucursales que tiene a cargo al Gerente Regional
     */
    consultarSucursalesACargo_MunAlca(GUID){
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
                console.log(results[0]);
                return resolve(result);
            });
        });
    }

    /**
     * 
     * @param {String} GUID GUID del gerente regional
     * @returns Devulve las entidades de las sucursales que tiene a cargo al Gerente Regional
     */
    consultarSucursalesACargo_Entidad(GUID){
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
                console.log(results[0]);
                return resolve(result);
            });
        });
    }

    /**
     * 
     * @param {String} GUID GUID del gerente regional
     * @returns Devulve los productos en venta de las sucursales que tiene a cargo al Gerente Regional
     */
    consultarSucursalesACargo_ProductosVendidos(GUID){
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
                console.log(results[0]);
                return resolve(result);
            });
        });
    }

    /**
     * 
     * @param {String} GUID GUID del gerente regional
     * @returns Devuelve el tipo de producto que tiene en venta las sucursales que tiene a cargo al Gerente Regional
     */
    consultarSucursalesACargo_TipoProductosVendidos(GUID){
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
                console.log(results[0]);
                return resolve(result);
            });
        });
    }

}