import papa from "papaparse";
import * as fs from 'node:fs';
import { convertirFecha } from "../Ayudas/Ayudas.js";

export class Historico {
    archivoReporte;
    ventasBD;
    guid;

    /**
     * Constructor
     * @param {File} archivoReporte Archivo del reporte
     * @param {VentasBD} ventasBD VentasDB
     */
    constructor(archivoReporte, ventasBD) {
        this.archivoReporte = archivoReporte;
        this.ventasBD = ventasBD;
    }

    /**
     * Genera el historico
     * @param {String} direccionArchivo Direccion donde esta el archivo que subio el encargado
     * @param {VentasBD} ventasBD Clase ventasBD
     * @param {Venta} venta Clase venta 
     * @param {String} guid GUID del encargado 
     * @returns Develve true si todo salio bien
     * @returns Devuelde false si algo saio mal
     */
    generarHistorico(direccionArchivo, ventasBD, venta, guid) {
        let file = fs.createReadStream(direccionArchivo);
        let i = 0;
        let banderaExito = true;
        let arrResul = new Array();
        return new Promise((resolve, reject) => {
            papa.parse(file, {
                header: false,
                delimiter: ",",
                skipEmptyLines: true,
                error: function (error, file, reason) {
                    console.error("ERROR EN EL ARCHIVO" + error);
                    resolve(false);
                },
                step: async function (results, parse) {
                    parse.pause();
                    try {
                        if (i !== 0) {
                            const arr = results.data;
                            const fecha = convertirFecha(arr[0]);
                            const cantidadProd = parseInt(arr[1], 10);
                            const nombreProd = arr[2];
                            const idSucursal = await ventasBD.consultarIdSucursalEncargado(guid);
                            const idProd = await ventasBD.obtenerIdProducto([guid, nombreProd]);
                            venta.setFechaVenta(fecha);
                            venta.setCantidadVenta(cantidadProd);
                            venta.setIdProducto(idProd);
                            venta.setIdSucursal(idSucursal);
                            arrResul.push(venta.arrInfoVentas());
                            console.log(venta.arrInfoVentas());
                        }
                    } catch (error) {
                        banderaExito = false;
                        console.error("ERROR AL PAESEAR", error);
                        parse.abort();
                    }
                    ++i;
                    parse.resume();
                },
                complete: async function (results) {
                    if(banderaExito === false){
                        return resolve(banderaExito);
                    }
                    try {
                        const exitoInsercionVenta = await ventasBD.insertarVenta(arrResul);
                        return resolve(exitoInsercionVenta)
                    } catch (error) {
                        banderaExito = false;
                        console.error("ERROR AL INSERTAR EN LA BD " + error);
                        return resolve(banderaExito)
                    }
                }
            })
        });

    }

    /**
     * Incializa la ubicacion del archivo
     * @param {String} archivoReporte Ubicacion del archivo
     */
    setArchivoReporte(archivoReporte) {
        this.archivoReporte = archivoReporte;
    }

    /**
     * Incializa ventasDB
     * @param {VentasBD} ventasBD Clase VentasBD
     */
    setVentasBD(ventasBD) {
        this.ventasBD = ventasBD;
    }

    /**
     * Inicializa le GUID del encargado
     * @param {String} guid GUID del encargado 
     */
    setGUID(guid) {
        this.guid = guid;
    }

}