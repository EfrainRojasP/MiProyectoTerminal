import { arrDeStringAFloat, arrDeStringAInt } from "../Ayudas/Ayudas.js";

export class Grafico {
    tipoGrafico;
    ejeX = [];
    ejeY = [];
    nomEjeX;
    nomEjeY;

    /**
     * Constructor
     * @param {String} tipoGrafico Tipo del grafico barra o linea
     * @param {Array} ejeX Contenido del eje x
     * @param {Array} ejeY Contenido del eje y
     * @param {String} nomEjeX Nombre del eje x
     * @param {String} nomEjeY Nombre del eje y
     */
    constructor(tipoGrafico, ejeX, ejeY, nomEjeX, nomEjeY) {
        this.tipoGrafico = tipoGrafico;
        this.ejeX = ejeX;
        this.ejeY = ejeY;
        this.nomEjeX = nomEjeX;
        this.nomEjeY = nomEjeY;
        this.convercionEjes();
        this.refeactorizarEjes();
    }

    /**
     * Convierte los ejes de String a int o float
     */
    convercionEjes() {
        if (this.nomEjeX === "Precio") {
            this.ejeX = arrDeStringAFloat(this.ejeX);
        }
        if (this.nomEjeX === "Cantidad") {
            this.ejeX = arrDeStringAInt(this.ejeX);
        }
        if (this.nomEjeY === "Precio") {
            this.ejeY = arrDeStringAFloat(this.ejeY);
            console.log("PRECIO " + this.ejeY);
        }
        if (this.nomEjeY === "Cantidad") {
            this.ejeY = arrDeStringAInt(this.ejeY);
        }
    }

    /**
     * Suma los valores de los ejes
     */
    refeactorizarEjes() {
        if (this.nomEjeX !== "Cantidad" || this.nomEjeX !== "Precio") {
            let auxEjeX = [this.ejeX[0]];
            let auxEjeY = [];

            for (let i = 0; i < this.ejeX.length; ++i) {
                if (auxEjeX.includes(this.ejeX[i])) {
                    const index = auxEjeX.indexOf(this.ejeX[i]);
                    if (typeof auxEjeY[index] === "undefined") {
                        auxEjeY.push(this.ejeY[i]);
                    } else {
                        let suma = auxEjeY[index] + this.ejeY[i];
                        auxEjeY[index] = suma;
                    }
                } else {
                    auxEjeX.push(this.ejeX[i]);
                    auxEjeY.push(this.ejeY[i]);
                }
            }
            this.ejeX = auxEjeX;
            this.ejeY = auxEjeY;
        }
    }

    /**
     * Metodo get, recupera el tipo de graficp
     * @returns Devulve el tipo de grafico
     */
    getTipoGrafico() {
        return this.tipoGrafico;
    }

    /**
     * Recupera el contenido en el eje x
     * @returns Devuelve el eje x
     */
    getEjeX() {
        return this.ejeX;
    }

    /**
     * Recupera el contenido en el eje y
     * @returns Devuelve en contenido en el eje y
     */
    getEjeY() {
        return this.ejeY;
    }

    /**
     * Recupera el nombre del eje x
     * @returns Recupera el contenido del eje x
     */
    getNomEjeX() {
        return this.nomEjeX;
    }
    
    /**
     * Recupera el nombre del eje y
     * @returns Recupera el contenido del eje y
     */
    getNomEjeY() {
        return this.nomEjeY;
    }

    /**
     * Inicializa el tipo del grafico
     * @param {String} tipoGrafico Tipo de grafico bar (barras) o line (line)
     */
    setTipoGrafico(tipoGrafico) {
        this.tipoGrafico = tipoGrafico;
    }

    /**
     * Incializa el eje x
     * @param {Array} ejeX Contenido del eje x 
     */
    setEjeX(ejeX) {
        this.ejeX = ejeX;
    }

    /**
     * Incializa el eje y
     * @param {Array} ejey Contenido del eje y 
     */
    setEjeY(ejeY) {
        this.ejeY = ejeY;
    }

    /**
     * Inicializa el nombre del eje X
     * @param {String} nomEjeX Nombre del eje X
     */
    setNomEjeX(nomEjeX) {
        this.nomEjeX = nomEjeX;
    }

    /**
     * Inicializa el nombre del eje X
     * @param {String} nomEjeY Nombre del eje X
     */
    setNomEjeY(nomEjeY) {
        this.nomEjeY = nomEjeY;
    }

}