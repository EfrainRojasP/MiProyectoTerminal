async function fetchReportesPedidos() {
    const tokenGerente = window.localStorage.getItem("access-token");
    let response = await fetch('/GrenteRegional/Reportes/CuantosReportes', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenGerente
        }
    });
    
    let result = await response.json();

    return result;
}

async function fetchReportesEntregados() {
    const tokenGerente = window.localStorage.getItem("access-token");
    let response = await fetch('/GrenteRegional/Reportes/CuantosReportesEntregados', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenGerente
        }
    });
    
    let result = await response.json();

    return result;
}

async function fetchTablaReportes() {
    const tokenGerente = window.localStorage.getItem("access-token");
    let response = await fetch('/GrenteRegional/Reportes/TablaReportes', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenGerente
        }
    });
    
    let result = await response.json();

    return result;
}

function cargarContador(cuantosReportes, cuantosReporteEntregados) {
    const reportesPedidos = document.getElementById("reportesPedidos");
    const reportesEntragados = document.getElementById("reportesEntrgados");
    reportesPedidos.textContent = cuantosReportes[0];
    reportesEntragados.textContent = cuantosReporteEntregados[0];
}

function cargarTabla(tablaReporte) {
    const tabla = document.getElementById("tblReportes");
    cargarCabeceras(tabla);
    cargarCuerpoTabla(tabla, tablaReporte);

}

function cargarCabeceras(tabla) {
    const header = document.createElement('thead');
    tabla.appendChild(header);
    const cabeceras = ["Estado del Reporte", "Nombre Sucursal", "Direccion Sucursal"];
    const filaCabecera = header.appendChild(document.createElement("tr"));
    for (let i = 0; i < cabeceras.length; i++) {
        filaCabecera.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(cabeceras[i]));
    }
}

function cargarCuerpoTabla(tabla, tablaRes) {
    const body = document.createElement("tbody");
    tabla.appendChild(body);
    for (let index = 0; index < tablaRes.length; index++) {
        const filaVenta = body.appendChild(document.createElement("tr"));
        const element = tablaRes[index];
        console.log(typeof element);
        for (const key in element) {
            const value = element[key];
            const celdaVenta = filaVenta.appendChild(document.createElement("td"));
            const infoVenta = document.createTextNode(value);
            celdaVenta.appendChild(infoVenta);
        }
    }
}

async function main() {
    const cuantosReportes = await fetchReportesPedidos();
    const reportesEntragados = await fetchReportesEntregados();
    if(cuantosReportes.error){
        alert(cuantosReportes.error);
    }
    if(cuantosReportes.mensaje){
        alert(cuantosReportes.mensaje);
        window.location.replace(cuantosReportes.redirec);
    }
    const tablaReporte = await fetchTablaReportes();
    cargarContador(cuantosReportes, reportesEntragados);
    cargarTabla(tablaReporte);
}

main();