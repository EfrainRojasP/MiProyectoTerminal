import { ConexionVentasDB } from "../ConexionBD/ConexionVentasDB.js";
import { ConsultarVentas } from "./Consultas.js";

export class ManagerConsultas{

    GUID;

    /**
     * 
     * @param {String} GUID
     * GUID del usuaio para realizar consultas
     *  
     */
    constructor(GUID) {
        this.GUID = GUID
    }

    /**
     * 
     * @returns Devuelve la respuesta de la consulta en formato JSON
     */
    async consultarTodasLasVentas(){
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarTodasVentas(this.GUID);
        return respuesta;
    }

}