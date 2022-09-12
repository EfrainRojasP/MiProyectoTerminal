var checkGenerarGrafico = document.getElementById("generarGrafico");
const tipoGrafica = document.getElementById("tipoGrafica");
const infoGrafica = document.getElementById("tipoGraficaInfo");
var btnGenerarGrafica = document.getElementById("btnGenerarGrafica");

//Se disabilitan los siguientes elemento
tipoGrafica.disabled = true;
infoGrafica.disabled = true;
btnGenerarGrafica.disabled = true;

//Se les añade la propiedad requierd a los siguientes elementos
tipoGrafica.setAttribute("required", "");
infoGrafica.setAttribute("required", "");

//Funcion para activar o desactivar varios elementos
checkGenerarGrafico.onclick = function () {
    if (checkGenerarGrafico.checked === true) {
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
infoGrafica.onchange = function () {
    console.log("Hola");
    indexOpcion = infoGrafica.selectedIndex;
    opcionGrafica = infoGrafica.options[indexOpcion];

    var mostarInfoGrafica = document.getElementById("infoGrafica");
    if (indexOpcion == 1) {
        mostarInfoGrafica.innerHTML = "Muestra una grafica de la cantidad de productos vendidos en cada sucursal";
    } else if (indexOpcion == 2) {
        mostarInfoGrafica.innerHTML = "Muestra una grafica de la cantidad de productos vendidos por dia";
    } else if (indexOpcion == 3) {
        mostarInfoGrafica.innerHTML = "Muestra una grafica de la cantidad de productos vendidos";
    }
    console.log(opcionGrafica.value + " " + opcionGrafica.text + " " + indexOpcion);
};

function extraerInfoG(ejeX) {

    const classCantidad = document.getElementsByClassName("Cantidad");
    const seleccionEjeX = document.getElementsByClassName(ejeX);
    let arrCantidad = [];
    let arrOpcion = [];
    for (let i = 0; i < classCantidad.length; ++i) {
        arrCantidad.push(classCantidad[i].textContent);
        arrOpcion.push(seleccionEjeX[i].textContent);
    }
    return [arrCantidad, arrOpcion];
}

function info(index) {
    if(index === 1){
        return "Sucursal";
    } else if(index === 2){
        return "Fecha de venta";
    } else if(index === 3){
        return "Producto";
    }
}

class Grafico{
    ejeY = [];
    ejeX = [];
    tipo;
    tipoEjeX;
    tipoEjeY;
}

//Vilidamos que el usuario no escoja campos vacios
btnGenerarGrafica.onclick = function () {
    if (tipoGrafica.selectedIndex == 0) {
        alert("Seleccione una opcion de grafica");
        return 0;
    } else if (infoGrafica.selectedIndex == 0) {
        alert("Seleccione el tipo de grafico que desa generar");
        return 0;
    }
    const ejeX = infoGrafica.options[infoGrafica.selectedIndex].value;
    const grafico = new Grafico();
    const arrEjes = extraerInfoG(ejeX);
    grafico.ejeY = arrEjes[0];
    grafico.ejeX = arrEjes[1];
    grafico.tipo = tipoGrafica.options[tipoGrafica.selectedIndex].value;
    grafico.tipoEjeX = info(infoGrafica.selectedIndex);
    grafico.tipoEjeY = "Cantidad";
    console.log(grafico);
    //Salert("Espera");
    window.localStorage.setItem("grafico", JSON.stringify(grafico));
    //document.forms[0].submit;
}
