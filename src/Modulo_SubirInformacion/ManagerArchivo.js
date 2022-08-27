import { extraerToken } from "../Ayudas/Ayudas.js";
import { Token } from "../Modulo_AutentificacionAutorizacion/Token.js";
import { Archivo } from "./Archivo.js";

export class ManagerArchivo{
    token;
    GUID;
    archivo;

    /**
     * Constructor de ManagerArchivo
     * @param {File} archivo Archivo que envio el usuario
     */
    constructor(archivo) {
        this.token = new Token();
        this.archivo = archivo;
    }

    /**
     * 
     * @param {authorization} token Token de usuario
     * @returns True, si el archivo se guardo con exito.
     * @returns Objeto, si el archivo no se guardo con exito o el token es 
     * incrrecto o la extencion es invalida.
     * 
     */
    async guardarArchivo(token){
        const tokenEncargado = extraerToken(token);
        const GUIDEncargado = await this.token.extraerGUID(tokenEncargado);
        if(!GUIDEncargado){
            return {
                error: "Hubo un error, intentalo mas tarde"
            };
        }
        const archivoEncargado = new Archivo(GUIDEncargado, this.archivo);
        const extencionValida = archivoEncargado.validarArchivoExtencion(this.archivo.name);
        if(!extencionValida){
            return {
                error: "Archivo invalido, solo se admiten archivos con extencion '.csv'"
            };
        }
        const estadoGuardado = await archivoEncargado.guardarArchivo();
        if(!estadoGuardado){
            return {
                error: "Parece que tubimos un problema al subir el archivo, intentalo mas tarde"
            };
        }
        return estadoGuardado;
    }

}