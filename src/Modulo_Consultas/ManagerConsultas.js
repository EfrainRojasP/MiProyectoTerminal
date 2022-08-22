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

    /**
     * 
     * @returns Devulve las sucursales a cargo que tiene el gerente regional
     */
    async consultarSucursalesACargo(){
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo(this.GUID);
        return respuesta;
    }

    /**
     * 
     * @returns Devulve el municipio o entidad de las sucursalales que tiene a cargo al Gerente Regional
     */
    async consultarSucursalesACargo_MunAlca(){
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo_MunAlca(this.GUID);
        return respuesta;
    }


    /**
     * 
     * @returns Devulve las entidades de las sucursales que tiene a cargo al Gerente Regional
     */
    async consultarSucursalesACargo_Entidad(){
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo_Entidad(this.GUID);
        return respuesta;
    }

    /**
     * 
     * @returns Devulve los productos en venta de las sucursales que tiene a cargo al Gerente Regional
     */
    async consultarSucursalesACargo_Producto(){
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo_ProductosVendidos(this.GUID);
        return respuesta;
    }

    /**
     * 
     * @returns Devuelve el tipo de producto que tiene en venta las sucursales que tiene a cargo al Gerente Regional
     */
    async consultarSucursalesACargo_TipoProducto(){
        const conexionDBventas = new ConexionVentasDB();
        const consultarVenta = new ConsultarVentas(conexionDBventas.getConexion());
        const respuesta = await consultarVenta.consultarSucursalesACargo_TipoProductosVendidos(this.GUID);
        console.log("TIPO" + respuesta);
        return respuesta;
    }

}