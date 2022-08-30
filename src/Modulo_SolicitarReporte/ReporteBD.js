import { convertirRespuestaAObjeto, refectorizarFecha } from "../Ayudas/Ayudas.js";
import { ConexionReporteDB } from "../ConexionBD/ConexionReporteBD.js";

export class ReporteDB {

    mysqlDBReporte;

    /**
     * Constructor ReporteBD
     * @param {ConexionReporteDB} mysqlDBReporte Instancia de la conexion a la BD Reportes
     */
    constructor(mysqlDBReporte) {
        this.mysqlDBReporte = mysqlDBReporte;
    }


    /**
     * Insertamos un reporte
     * @param {Reporte} reporte 
     * @returns Devulve TRUE, si la insercion todo salio bien
     * @returns Devulve FALSE, si algo salio mal
     */
    insertarReporte(reporte) {
        return new Promise((resolve, reject) => {
            const stm = "CALL InsertarReporte(?,?,?,?,?)";
            const query = this.mysqlDBReporte.query(stm, reporte, function (error, results, fields) {
                if (error) {
                    resolve(false);
                    return reject(error.stack)
                }
                return resolve(true);
            });
        });
    }

    /**
     * Insertamos un vinculamos el reporte con el encargado
     * @param {Reporte} reporte 
     * @returns Devulve TRUE, si la insercion todo salio bien
     * @returns Devulve FALSE, si algo salio mal
     */
    insertarReporteEncargado(arrReporteEncargado) {
        console.log(arrReporteEncargado);
        return new Promise((resolve, reject) => {
            const stm = "CALL InsertarReporteEncargado (?,?)";
            const query = this.mysqlDBReporte.query(stm, arrReporteEncargado, function (error, results, fields) {
                if (error) {
                    console.error("ERROR EN LA BDVentas " + error);
                    resolve(false);
                    return reject(error.stack)
                }
                return resolve(true);
            });
        });
    }

    /**
     * Obtenemos la informacion del reporte
     * @param {GUID} GUID GUID del Gerente Regional 
     * @returns Devulve un objeto con la informacion del reporte
     * @returns Devulve FALSE, si algo salio mal 
     */
    informacionReporte(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "CALL InformacionReporte (?)";
            const query = this.mysqlDBReporte.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                //console.log("HAY O NO " + results[0].length);
                if (results[0].length === 0) {
                    return resolve(false);
                }
                //console.log(results);
                let result = convertirRespuestaAObjeto(results[0]);
                result = refectorizarFecha(result, 2);
                //console.log(result);
                return resolve(result);
            });
        });
    }

    /**
     * Obtenemos cuantos reportes solicitamos
     * @param {GUID} GUID GUID del Gerente Regional 
     * @returns Devulve un objeto con los reportes que solicitamos
     * @returns Devulve FALSE, si algo salio mal 
     */
    cuantosReporte(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "SELECT ObtenerCantidadReportes(?)";
            const query = this.mysqlDBReporte.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                let result = convertirRespuestaAObjeto(results[0]);
                //console.log(result);
                return resolve(result);
            });
        });
    }

    /**
     * Obtenemos cuantos reportes se han entregado
     * @param {GUID} GUID GUID del Gerente Regional 
     * @returns Devulve un objeto con los reportes entregados
     * @returns Devulve FALSE, si algo salio mal  
     */
    cuantosReportesEntregados(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "SELECT ObtenerCantidadReportesEntregados(?)";
            const query = this.mysqlDBReporte.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0] === undefined) {
                    return resolve(false);
                }
                //console.log(results);
                let result = convertirRespuestaAObjeto(results[0]);
                //console.log(result);
                return resolve(result);
            });
        });
    }

    /**
     * Obtenemos el estado de los reportes, es decir, si ya o no lo han entregado
     * @param {GUID} GUID GUID del Gerente Regional 
     * @returns Devulve un objeto con la informacion de los reportes
     * @returns Devulve FALSE, si algo salio mal 
     */
    consultarEstadoResportes(GUID) {
        return new Promise((resolve, reject) => {
            const stm = "CALL InformacionReportesEntregados(?)";
            const query = this.mysqlDBReporte.query(stm, GUID, function (error, results, fields) {
                if (error) {
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if (results[0].length === 0) {
                    return resolve(false);
                }
                //console.log(results);
                let result = convertirRespuestaAObjeto(results[0]);
                //console.log(result);
                return resolve(result);
            });
        });
    }

}