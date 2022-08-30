import { crearGUID, extraerToken, fechaAlDia } from "../Ayudas/Ayudas.js";
import { ConexionReporteDB } from "../ConexionBD/ConexionReporteBD.js";
import { ConexionVentasDB } from "../ConexionBD/ConexionVentasDB.js";
import { Token } from "../Modulo_AutentificacionAutorizacion/Token.js";
import { ConsultarVentas } from "../Modulo_Consultas/Consultas.js";
import { Reporte } from "./Reporte.js";
import { ReporteDB } from "./ReporteBD.js";

export class ManagerSolicitarReporte {
    reporte = new Reporte();
    conexionMYSQLReporte = new ConexionReporteDB();
    conexionMYSQLVentas = new ConexionVentasDB();
    consultaVenta;
    reporteBD;
    reporteGerente;
    cabeceraAuth;
    tokenGerente;
    GUIDGerente;

    /**
     * Constructor
     * @param {Reporte} reporteGerente Reporte que nos envia el Gerente desde la web
     * @param {Authorization} cabeceraAuth Cabecera Authorization
     */
    constructor(reporteGerente, cabeceraAuth) {
        this.reporteGerente = reporteGerente;
        this.cabeceraAuth = cabeceraAuth;
        this.reporteBD = new ReporteDB(this.conexionMYSQLReporte.getConexion());
        this.consultaVenta = new ConsultarVentas(this.conexionMYSQLVentas.getConexion());
        this.token = new Token();
    }

    /**
     * Seteamos el GUIDReporte
     * @returns Devulve un objeto con la propiedad "error", en caso de un error
     */
    async setGUIDReporte() {
        this.tokenGerente = extraerToken(this.cabeceraAuth);
        this.GUIDGerente = await this.token.extraerGUID(this.tokenGerente);
        if (!this.GUIDGerente) {
            return {
                error: "Tubimos un problema, tranquilo no es cual tuya. Intalo de nuevo o mas tarde"
            };
        }
        return this.GUIDGerente;
    }

    /**
     * Insertamos un reporte en la BD de Reportes
     * @returns Devulve un objeto con la propiedad "error", en caso de un error.
     * @returns Devulve un objeto con la propiedad "exito", que indica las caracteristas del reporte que
     * se ha introducido en la BD de Repotes
     */
    async insertarReporteBD() {
        const GUIDReporte = crearGUID(20);
        this.tokenGerente = extraerToken(this.cabeceraAuth);
        this.GUIDGerente = await this.token.extraerGUID(this.tokenGerente);
        if (!this.GUIDGerente) {
            return {
                error: "Tubimos un problema, tranquilo no es cual tuya. Intalo de nuevo o mas tarde"
            };
        }
        const fecha = fechaAlDia();
        this.reporte.setGUIDReporte(GUIDReporte);
        this.reporte.setDescReporte(this.reporteGerente.descripcion);
        this.reporte.setFechaEntraga(this.reporteGerente.fechaDeEntrega);
        this.reporte.setFechaSolicitud(fecha);
        const arr = this.reporte.getArrayReporteCaracteristicas();
        arr.unshift(this.GUIDGerente);
        const estadoInsercion = await this.reporteBD.insertarReporte(arr);
        if (!estadoInsercion) {
            return {
                error: "Tubimos un problema, tranquilo no es cual tuya. Intalo de nuevo o mas tarde"
            }
        }
        return {
            exito: "Se solicito el reporte con fecha limite " + this.reporteGerente.fechaDeEntrega + " " +
                ". Con la descripcion " + this.reporteGerente.descripcion + "."
        };
    }


    /**
     * Vinculamos el reporte con los encargados, para saber que encargado debe entregar que reporte
     * @returns Devulve un objeto con la propiedad "error", en caso de un error.
     * @returns @returns Devulve un objeto con la propiedad "exito", si todo salio bien.
     */
    async insertarReporteEncargadoBD() {
        const arrReporteEncargado = [this.GUIDGerente, this.reporte.getGUIDReporte()];
        const estadoInsercion = await this.reporteBD.insertarReporteEncargado(arrReporteEncargado);
        console.log(estadoInsercion);
        if (!estadoInsercion) {
            console.log("EROOOOR");
            return {
                error: "Tubimos un problema, tranquilo no es cual tuya. Intalo de nuevo o mas tarde"
            }
        }
        return {
            exito: "Se inserto el reporte a la BD"
        }
    }

    /**
     * Verificamos si podemos solicitar un reporte. En caso de que hayamos pedido un reporte y la fecha
     * entraga aun no sucede, no podremos insertar un reporte.
     * @returns Devuelve True, si podemos solicitar un reporte
     * @returns Devuelve un objeto con las propiedades "mensaje" y "redirec", si no podemos solicitar un reporte 
     */
    async puedoSolicitarReporte() {
        const GUID = await this.setGUIDReporte();
        if (typeof GUID !== "string") {
            return GUID;
        }
        const res = await this.reporteBD.informacionReporte(this.GUIDGerente);
        console.log(res);
        if (!res) {
            return true;
        }
        if (!this.permitirSolicitarReporte(res[0]["fechaLimite"])) {
            return {
                mensaje: "Solo pude solicitar un reporte, debe esperar hasta que la fecha " + "'" +
                    res[0]["fechaLimite"] + "' se cumpla",
                redirect: "reporteSolicitado.html"
            }
        }
        return true;
    }

    /**
     * Obtenemos la informacion del reporte
     * @returns Devulve la informacion del reporte
     * @returns Devulve un objeto con la propiedad "error", en caso de un error.
     */
    async informacionReporte() {
        if (typeof await this.setGUIDReporte() !== "string") {
            return GUID;
        }
        const res = await this.reporteBD.informacionReporte(this.GUIDGerente);
        if (!res) {
            return {
                error: "Tuvimos un problema al consultar el reporte, profavor intentalo mas tarde"
            };
        }
        return res[0];

    }

    /**
     * Nos idica si podemos soliciar o no un reporte
     * @param {String} fechaLimite Fecha limite de entrega del reporte
     * @returns Devuelve FALSE, si no podemos solicitar un reporte
     * @returns Devulve TRUE, si podemos solicitar un reporte
     */
    permitirSolicitarReporte(fechaLimite) {
        const fechaActual = fechaAlDia();
        const permitir = fechaActual.localeCompare(fechaLimite);
        if (permitir === 1) {
            return true;
        }
        return false;
    }
}