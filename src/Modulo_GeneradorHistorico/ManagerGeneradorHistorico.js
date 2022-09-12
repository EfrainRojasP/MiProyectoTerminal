import papa from "papaparse";
import { extraerToken } from "../Ayudas/Ayudas.js";
import { ConexionReporteDB } from "../ConexionBD/ConexionReporteBD.js";
import { ConexionVentasDB } from "../ConexionBD/ConexionVentasDB.js";
import { Token } from "../Modulo_AutentificacionAutorizacion/Token.js";
import { VentasBD } from "../Modulo_Consultas/VentasBD.js";
import { ReporteDB } from "../Modulo_SolicitarReporte/ReporteBD.js";
import { Archivo } from "../Modulo_SubirInformacion/Archivo.js";
import { Historico } from "./Historico.js";
import { Venta } from "./Venta.js";

export class ManagerGeneradorHistorico {
    token;
    archivo;
    GUIDEncargado;
    historico;
    ventasBD;
    reporteDB;
    conexionVentasDB = new ConexionVentasDB();
    conexionReporteBD = new ConexionReporteDB();
    venta;

    /**
     * Constructor
     * @param {String} authorization Cabecera authorization
     */
    constructor(authorization) {
        this.token = extraerToken(authorization);
        this.ventasBD = new VentasBD(this.conexionVentasDB.getConexion());
        this.historico = new Historico();
        this.reporteDB = new ReporteDB(this.conexionReporteBD.getConexion());
        this.venta = new Venta();
    }

    /**
     * Gerenara el historico
     * @returns Devuelve un objeto con un mensaje de error o exito
     */
    async generarHistorico() {
        this.GUIDEncargado = await this.extrerToken();
        console.log(this.GUIDEncargado);
        if (!this.GUIDEncargado) {
            return {
                error: "Tuvimos un problema, no es culpa tuya. Intentalo mas tarde"
            }
        }
        //this.archivo.setNombreArchivo(this.GUIDEncargado);
        this.archivo = new Archivo(this.GUIDEncargado);
        this.historico.setGUID(this.GUIDEncargado);
        //console.log(this.GUIDEncargado + " ARCH " + this.archivo.getNombreArchivo());
        const existeArchivo = await this.archivo.existeArchivo();
        if (!existeArchivo) {
            return {
                error: "Tuvimos un problema, vulve a subir el archivo"
            }
        }
        const direccionArchivo = this.archivo.getUbicacionArchivo();
        const res = await this.historico.generarHistorico(direccionArchivo, this.ventasBD, this.venta, this.GUIDEncargado);
        if(!res){
            return {
                error: "Tubimos un problema al subir el contenido del archivo en la base de datos. Recuerda, NO DEBES EDITAR EL ARCHIVO"
            }
        }
        return {
            mensaje: "La informaicion del archivo se añadio con exito a la base de datos"
        };
    }

    /**
     * Actualiza el estado del reporte cuando es entragado
     * @returns Devuelve un objeto con un mensaje de error o exito
     */
    async actualizarEstadoReporte(){
        try {
            const id = await this.reporteDB.consultarIdERES(this.GUIDEncargado);
            if(id === 0){
                return {
                    error: "Tuvimos un error, tranquilo no es culpa tuya vulve a intentarlo mas tarde"
                }
            }
            const actulizacionRpor = await this.reporteDB.actualizarEstadoReporte(id);
            return {
                mensaje: "Todo salio bien"
            }
        } catch (error) {
            console.error("ERROR MGeneradorHistorico " + error);
            return {
                error: "Tuvimos un error, tranquilo no es culpa tuya vulve a intentarlo mas tarde"
            }
        }
    }

    /**
     * Verifica si el encargado ya entrego un reporte
     * @returns Devuelve un objeto con un mensaje de error o exito
     */
    async verificarEntrgaReporte(){
        try {
            this.GUIDEncargado = await this.extrerToken();
            if (!this.GUIDEncargado) {
                return {
                    error: "Tuvimos un problema, no es culpa tuya. Intentalo mas tarde"
                }
            }
            const puedeSubirArch = await this.reporteDB.consultarEntregaEncargado(this.GUIDEncargado)
            //console.log(puedeSubirArch);
            if(puedeSubirArch === 1){
                return{
                    mensaje: "Ya has subido el reporte",
                    redirect: "/Encargado/EncargadoSinReporte.html"
                }
            }
            if(puedeSubirArch === 0){
                return {
                    mensaje: "No han solicitado un reporte",
                    redirect: "/Encargado/EncargadoSinReporte.html"
                }
            }
            return {
                permitido: true
            }
        } catch (error) {
            console.error("ERROR MAGH " + error);
            return {
                error: "Tuvimos un error, tranquilo no es culpa tuya vulve a intentarlo mas tarde"
            }
        }
    }

    /**
     * Extrae el token del gerente
     * @returns Devuelve el token
     */
    async extrerToken() {
        const guid = new Token();
        return await guid.extraerGUID(this.token);
    }


}