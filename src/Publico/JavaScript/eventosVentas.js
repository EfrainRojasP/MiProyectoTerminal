var checkGenerarGrafico = document.getElementById("generarGrafico");
var tipoGrafica = document.getElementById("tipoGrafica");
var infoGrafica = document.getElementById("tipoGraficaInfo");
var btnGenerarGrafica = document.getElementById("btnGenerarGrafica");

//Se disabilitan los siguientes elemento
tipoGrafica.disabled = true;
infoGrafica.disabled = true;
btnGenerarGrafica.disabled = true;

//Se les añade la propiedad requierd a los siguientes elementos
tipoGrafica.setAttribute("required", "");
infoGrafica.setAttribute("required", "");

//Funcion para activar o desactivar varios elementos
checkGenerarGrafico.onclick = function(){
    if(checkGenerarGrafico.checked === true){
        tipoGrafica.disabled = false;
        infoGrafica.disabled = false;
        btnGenerarGrafica.disabled = false;
    } else {
        tipoGrafica.disabled = true;
        infoGrafica.disabled = true;
        btnGenerarGrafica.disabled = true;
    }
};

//Cada vez que se selecciona un cierto tipo de grafica mustra la informacion de la grafica que se generara
var opcionGrafica;
var indexOpcion;
infoGrafica.onchange = function(){
    console.log("Hola");
    indexOpcion = infoGrafica.selectedIndex;
    opcionGrafica = infoGrafica.options[indexOpcion];
    
    var mostarInfoGrafica = document.getElementById("infoGrafica");
    if(indexOpcion == 1){
        mostarInfoGrafica.innerHTML = "Mustra una grafica de la cantidad de productos vendidos en cada sucursal";
    } else if(indexOpcion == 2){
        mostarInfoGrafica.innerHTML = "Mustra una grafica de la cantidad de productos vendidos por dia";
    } else if (indexOpcion == 3){
        mostarInfoGrafica.innerHTML = "Mustra una grafica de la cantidad de productos vendidos";
    }
    console.log(opcionGrafica.value + " " + opcionGrafica.text + " " + indexOpcion);
};

//Vilidamos que el usuario no escoja campos vacios
btnGenerarGrafica.onclick = function(){
    if(tipoGrafica.selectedIndex == 0){
        alert("Seleccione una opcion de grafica");
        return 0;
    } else if (infoGrafica.selectedIndex == 0){
        alert("Seleccione el tipo de grafico que desa generar");
        return 0;
    }
    document.forms[0].submit;
}
