
function grafico() {
    versus();
    const canvas = document.getElementById("miGrafico");
    const configGrafico = window.localStorage.getItem("chart-config");
    const config = JSON.parse(configGrafico);
    const myChart = new Chart(canvas, config);
}

function versus(){
    const grafico = window.localStorage.getItem("grafico");
    const objGrafico = JSON.parse(grafico);
    const titulo = document.getElementById("tituloGrafico");
    titulo.textContent = objGrafico.tipoEjeY + " VS " + objGrafico.tipoEjeX;
}

grafico();
