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

}