var generarGrafico = document.getElementById("generarGrafico");
var cualGrafico = document.getElementById("tipoGrafico");
var btnGenarar = document.getElementById("btnGenerar");


btnGenarar.disabled = true;
cualGrafico.disabled = true;

generarGrafico.onchange = function(){
    if(generarGrafico.checked === true){
        cualGrafico.disabled = false;
        btnGenarar.disabled = false;
        cualGrafico.setAttribute("required", "");
    } else {
        cualGrafico.disabled = true;
        btnGenarar.disabled = true;
    }
}