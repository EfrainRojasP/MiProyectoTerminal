import { convertirRespuestaAObjeto, refectorizarFecha } from "../Ayudas/Ayudas.js";
import { ConexionReporteDB } from "../ConexionBD/ConexionReporteBD.js";

export class ReporteDB {

    mysqlDBReporte;

    constructor(mysqlDBReporte) {
        this.mysqlDBReporte = mysqlDBReporte;
    }


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