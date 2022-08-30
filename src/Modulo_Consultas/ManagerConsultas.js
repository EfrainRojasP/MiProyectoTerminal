import { consulta, consultaFecha, consultaPorCantidad, crearHasMap } from "../Ayudas/Ayudas.js";
import { ConexionReporteDB } from "../ConexionBD/ConexionReporteBD.js";
import { ConexionVentasDB } from "../ConexionBD/ConexionVentasDB.js";
import { ReporteDB } from "../Modulo_SolicitarReporte/ReporteBD.js";
import { ConsultarVentas } from "./Consultas.js";

export class ManagerConsultas {

    GUID;
    hashMap;
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
     * Metodo para consultar todas las ventas
     * @returns Devuelve la respuesta de la consulta en formato JSON
     */
    async consultarTodasLasVentas() {
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarTodasVentas(this.GUID);
        return respuesta;
    }

    /**
     * Metodo para consultar toas las sucursales a cargo que tiene un gerente regional
     * @returns Devulve las sucursales a cargo que tiene el gerente regional
     */
    async consultarSucursalesACargo() {
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo(this.GUID);
        return respuesta;
    }

    /**
     * Metodo para saber en que municipio o alcadia estan las sucursales que tiene a cargo el
     * gerente regional
     * @returns Devulve el municipio o entidad de las sucursalales que tiene a cargo al Gerente Regional
     */
    async consultarSucursalesACargo_MunAlca() {
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo_MunAlca(this.GUID);
        return respuesta;
    }


    /**
     * Metodo para saber en que entidad estan las sucursales que tiene a cargo el
     * gerente regional 
     * @returns Devulve las entidades de las sucursales que tiene a cargo al Gerente Regional
     */
    async consultarSucursalesACargo_Entidad() {
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo_Entidad(this.GUID);
        return respuesta;
    }

    /**
     * Metodo para saber cuales son los productos ventidos de cada sucursal que tiene a cargo el
     * gerente regional
     * @returns Devulve los productos en venta de las sucursales que tiene a cargo al Gerente Regional
     */
    async consultarSucursalesACargo_Producto() {
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo_ProductosVendidos(this.GUID);
        return respuesta;
    }

    /**
     * Metodo para saber cuales son los tipos productos ventidos de cada sucursal que tiene a cargo el
     * gerente regional
     * @returns Devuelve el tipo de producto que tiene en venta las sucursales que tiene a cargo al Gerente Regional
     */
    async consultarSucursalesACargo_TipoProducto() {
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo_TipoProductosVendidos(this.GUID);
        //console.log("TIPO" + respuesta);
        return respuesta;
    }

    /**
     * Metodo que hace la consulta personalizada
     * @param {Object} objeto Objeto que contiene el foramato de la consulta personalizada
     * @returns Devulve el resultado de la consulta personalizada
     */
    async consultaPersonalizada(objeto){
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const arr = this.crearConsultaPersonalizada(objeto);
        const stm = arr[0];
        const arrArgumentos = arr[1];
        console.log(stm + " " + arrArgumentos);
        const respuesta = await consultarVenta.consultaPersonalizada(stm, arrArgumentos);
        return respuesta;
    }

    /**
     * Metodo que genera la consulta SQL, para la consulta personalizada
     * @param {Object} objeto Objeto que contiene el foramato de la consulta personalizada
     * @returns Devulve le sentencia SQL de la consulta personalizada
     */
    crearConsultaPersonalizada(objeto) {
        this.hashMap = crearHasMap();
        let stm = "SELECT fechaVenta, cantidadVenta, nombreProducto, costoProducto, tipoProducto, nombreSucursal, NOMBREENTIDAD, NOMBREMUN_ALC  FROM Ventas_Cunsultas WHERE idEmpleado = (SELECT ObtenerIdUsuaio(?))";
        let arrParametrosConsulta = [];
        arrParametrosConsulta.push(this.GUID);
        for (const iterator in objeto) {
            const columna = this.hashMap.get(iterator);
            if (iterator === "porPeriodo") {
                stm = consultaFecha(arrParametrosConsulta, stm, columna, objeto[iterator]);
            } else if (iterator === "porProdMas" || iterator === "porPordMenos") {
                stm = consultaPorCantidad(arrParametrosConsulta, stm, columna, iterator);
            } else {
                stm = consulta(arrParametrosConsulta, stm, columna, objeto[iterator]);
            }
        }
        return [stm, arrParametrosConsulta];
    }

    /**
     * Consutamos cuantos reportes hay en la BD, depediendo del Gerente regional
     * @returns Un objeto con la propiedad "error", en caso de que haya un error.
     * O un objeto con las propiedades "mensaje" y "redirec", en caso de que no haya nigun reporte.
     * O un objeto con la cantidad de reportes
     */
    async cuantosReporte(){
        const conexionDBReporte = new ConexionReporteDB();
        const consultarReporte= new ReporteDB(conexionDBReporte.getConexion());
        const respuesta = await consultarReporte.cuantosReporte(this.GUID);
        if(!respuesta){
            return{
                error: "Tranquilo no es tu culpa, tubimos un error. Vulvelo a intentar mas tarde"
            }
        }
        if(respuesta[0] <= 0){
            return {
                mensaje: "No has pedido ningun reporte",
                redirec: "solicitarReporte.html"
            }
        }
        return respuesta;
    }

    /**
     * Consulta cuantos reportes han sido entragados
     * @returns Devulve un objeto con la propiedad "error", en caso de que haya un error.
     * O un objeto con la cantidad de reportes entregados
     */
    async cuantosReportesEntregados(){
        const conexionDBReporte = new ConexionReporteDB();
        const consultarReporte= new ReporteDB(conexionDBReporte.getConexion());
        const respuesta = await consultarReporte.cuantosReportesEntregados(this.GUID);
        if(!respuesta){
            return{
                error: "Tranquilo no es tu culpa, tubimos un error. Vulvelo a intentar mas tarde"
            }
        }
        return respuesta;
    }


    /**
     * Consulta la BD de reportes para saber el estado de los reportes
     * @returns Devulve un objeto con la propiedad "error", en caso de que haya un error.
     * O un objeto con la tabla de reportes
     */
    async tablaEstadoReportes(){
        const conexionDBReporte = new ConexionReporteDB();
        const consultarReporte= new ReporteDB(conexionDBReporte.getConexion());
        const respuesta = await consultarReporte.consultarEstadoResportes(this.GUID);
        if(!respuesta){
            return{
                error: "Tranquilo no es tu culpa, tubimos un error. Vulvelo a intentar mas tarde"
            }
        }
        return respuesta;
    }


}