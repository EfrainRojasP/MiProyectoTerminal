import { Grafico } from "./Grafico.js";

export class ManagerGeneracionGrafico {
    grafico;
    graficoGerente;

    /**
     * Constructor
     * @param {Object} graficoGerente Obejeto enviado por el usuario grente
     */
    constructor(graficoGerente) {
        this.graficoGerente = graficoGerente;
        this.grafico = new Grafico(this.graficoGerente.tipo, this.graficoGerente.ejeX, this.graficoGerente.ejeY,
            this.graficoGerente.tipoEjeX, this.graficoGerente.tipoEjeY);
    }

    /**
     * Genera el objeto para un grafico
     * @returns Devulve el objeto grafico
     */
    generarObjetoGrafico() {
        console.log(this.grafico);
        if(this.graficoGerente.tipo === "line"){
            //console.log("line");
            return this.generarConfigLine();
        } else if(this.graficoGerente.tipo === "bar"){
            return this.generarConfigBar();
        }
    }

    /**
     * Genera la parte visual del grafico
     * @returns Devulve la parte visual del grafico
     */
    generarData() {
        return {
            labels: this.grafico.getEjeX(),
            datasets: [{
                label: this.grafico.getNomEjeY(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                borderWidth: 1,
                data: this.grafico.getEjeY(),
            }]
        }
    }

    /**
     * Genera un grafico en linea
     * @returns Devuelve un grafico en linea
     */
    generarConfigLine() {
        return {
            type: this.grafico.getTipoGrafico(),
            data: this.generarData(),
            options: {}
        }
    }

    /**
     * Genera un grafico de barras
     * @returns Devuelve un grafico de barras
     */
    generarConfigBar() {
        return {
            type: this.grafico.getTipoGrafico(),
            data: this.generarData(),
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    }

}