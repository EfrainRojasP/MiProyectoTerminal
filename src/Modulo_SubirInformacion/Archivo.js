import Papa from "papaparse";
import * as url from 'url';
import path from "node:path";

export class Archivo {
    nombreArchivo;
    ubicacionArchivo;
    __dirArchivo;
    archivo;
    /**
     * Constructor, que inicializa el nombre del archivo
     * @param {String} nombreArchivo Nombre del archivo, el cual sera el GUID del encargado de la tienda
     * @param {File} archivo Archivo que envia el usuario 
     */
    constructor(nombreArchivo, archivo) {
        this.archivo = archivo;
        this.nombreArchivo = nombreArchivo + ".csv";
        this.__dirArchivo = url.fileURLToPath(new URL("../../ReporteVentas/", import.meta.url));
        this.ubicacionArchivo = this.__dirArchivo + this.nombreArchivo;
    }

    /**
     * Guarda el archivo en la carpeta ReporteVentas
     * @returns False, si hubo un error al guardar el archivo. True, si el archivo se guardo con exito
     * 
     */
    guardarArchivo() {
        //let rutaRelativa = path.relative("/src/Modulo_SubirInformacion", "/ReporteVentas");
        return new Promise((resolve, reject) => {
            this.archivo.mv(this.ubicacionArchivo, (err) => {
                if (err) {
                    console.error(err);
                    resolve(false);
                } else {
                    resolve (true)
                }
            });
        });
    }

    /**
     * Valida si la extencion del archivo es la correcta, solo se aceptan archivos .csv
     * @returns True, si la extencion de archivo es correcta. False, si la extencion es incoreccta
     */
    validarArchivoExtencion() {
        const extencionArchivo = path.extname(this.archivo.name);
        const arrayExtencionesValidas = [".csv"];
        if (!arrayExtencionesValidas.includes(extencionArchivo)) {
            return false;
        }
        return true;
    }
}