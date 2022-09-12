const ejeX = document.getElementById("ejeX");
const ejeY = document.getElementById("ejeY");
const pilaX = [0];
const pilaY = [0];


function deshabilitarSeleccion(sleccionId, select) {
    select.options[sleccionId].disabled = true;
}

function habilitarSeleccion(sleccionId, select) {
    select.options[sleccionId].disabled = false;
}

function comprobarSelecion(seleccionId, select) {
    console.log("X " + ejeX.options[seleccionId].value);
    console.log("Y " + ejeY.options[seleccionId].value);
    //if(ejeX.options[seleccionId].value === ejeY.options[seleccionId].value){
    //    select.value = 0;
    //}
}

ejeX.addEventListener("change", () => {
    const index = ejeX.selectedIndex;
    console.log("PILA X " + pilaX[0]);
    if(index > 0 && index <= 2){
        habilitarSeleccion(pilaX[0], ejeY);
        pilaX.pop();
        pilaX.push(index);
        deshabilitarSeleccion(index, ejeY);
    }
    if (index > 2) {
        //comprobarSelecion(index, ejeY);
        habilitarSeleccion(pilaX[0], ejeY);
        //pilaX.pop();
        //pilaX.push(pilaX[0]);
        console.log("EJE X "+ index);
    }
});

ejeY.addEventListener("change", () => {
    const index = ejeY.selectedIndex;
    if (index !== 0) {
        habilitarSeleccion(pilaY[0], ejeX);
        //comprobarSelecion(index, ejeX);
        pilaY.pop();
        pilaY.push(index);
        deshabilitarSeleccion(index, ejeX);
        console.log("EJE Y "+ index);
    }
});


class Grafico{
    ejeY = [];
    ejeX = [];
    tipo;
    tipoEjeX;
    tipoEjeY;
}

function extraer(ejeX, ejeY) {
    const seleccionX = document.getElementsByClassName(ejeX);
    const seleccionY = document.getElementsByClassName(ejeY);
    const tipoGrafico = document.getElementById("tipoGrafico");
    console.log("X ", seleccionX);
    console.log("Y ", seleccionY);
    const claseA = new Grafico();
    for(let i = 0; i < seleccionX.length; ++i){
        console.log("CLASS ", seleccionX[i].className);
        claseA.ejeX.push(seleccionX[i].textContent);
        claseA.ejeY.push(seleccionY[i].textContent);
    }
    claseA.tipo = tipoGrafico.options[tipoGrafico.selectedIndex].value;
    return claseA;
}

const btnGenerar = document.getElementById("btnGenerar");

btnGenerar.addEventListener("click", () =>{
    console.log("X " + pilaX + " Y " + pilaY);
    console.log(ejeX.options[ejeX.selectedIndex].value, ejeY.options[pilaY[0]].value);
    const obj = extraer(ejeX.options[ejeX.selectedIndex].value, ejeY.options[pilaY[0]].value);
    obj.tipoEjeX = ejeX.options[ejeX.selectedIndex].text;
    obj.tipoEjeY = ejeY.options[pilaY[0]].text;
    console.log(obj);
    window.localStorage.setItem("grafico", JSON.stringify(obj));
})

