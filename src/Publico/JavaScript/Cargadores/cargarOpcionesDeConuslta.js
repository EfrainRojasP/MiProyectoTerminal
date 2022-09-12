const tokenU = window.localStorage.getItem("access-token");
/*
const cualTienda = document.getElementById("cualTienda");
const cualMun = document.getElementById("cualMunicipioAlca");
const cualEntidad = document.getElementById("cualEntidad");
const cualProducto = document.getElementById("cualProducto");
const cualTipoProducto = document.getElementById("cualTipoProd");
*/

async function fetchTiendas(url) {
    let response = await fetch('/GrenteRegional' + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenU
        }
    });
    if (!response.ok) {
        return false;
    }

    let result = await response.json();

    return result;
}

function agregarOpciones(select, valor, texto) {
    const option = document.createElement('option');
    option.value = valor;
    option.text = texto;
    select.appendChild(option);
}

function cargarOpciones(opciones, select) {
    for (const i in opciones) {
        let arrValText = [];
        for (const j in opciones[i]) {
            arrValText.push(opciones[i][j]);
        }
        const value = arrValText[0];
        const texto = arrValText[1];
        agregarOpciones(select, value, texto)
        arrValText = [];
    }
}

async function main() {
    const cargadores = ["/SucursaresACargo", "/SucursaresACargo/MunAlca", 
        "/SucursaresACargo/Entidad", "/SucursaresACargo/Producto", "/SucursaresACargo/TipoProducto"];
    const arrSelct = ["cualTienda", "cualMunicipioAlca","cualEntidad", "cualProducto",
        "cualTipoProd"];
    for(let i = 0, j = 0; i < cargadores.length && j < arrSelct.length; ++i, ++j){
        const cargador = await fetchTiendas(cargadores[i]);
        const selct = document.getElementById(arrSelct[j]);
        cargarOpciones(cargador, selct);
    }
}

main();
