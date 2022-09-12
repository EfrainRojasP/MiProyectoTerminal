function cargarCabeceras(tabla) {
    const header = document.createElement('thead');
    tabla.appendChild(header);
    const cabeceras = ["Fecha de la venta", "Cantidad", "Producto", "Precio",
        "Tipo Producto", "Sucursal", "Entidad", "Municipio/Alcaldia"];
    const filaCabecera = header.appendChild(document.createElement("tr"));
    for (let i = 0; i < cabeceras.length; i++) {
        filaCabecera.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(cabeceras[i]));
    }
}

function cargarCuerpoTabla(tabla, tablaRes) {
    const cabeceras = ["Fecha_de_la_venta", "Cantidad", "Producto", "Precio",
        "Tipo_Producto", "Sucursal", "Entidad", "Municipio_Alcaldia"];
    const body = document.createElement("tbody");
    tabla.appendChild(body);
    for (let index = 0; index < tablaRes.length; index++) {
        const filaVenta = body.appendChild(document.createElement("tr"));
        //const filaVenta = tabla.insertRow();
        const element = tablaRes[index];
        console.log(typeof element);
        let k = 0;
        for (const key in element) {
            const value = element[key];
            const celdaVenta = filaVenta.appendChild(document.createElement("td"));
            celdaVenta.setAttribute("class", cabeceras[k]);
            const infoVenta = document.createTextNode(value);
            celdaVenta.appendChild(infoVenta);
            //const celdaVenta = filaVenta.insertCell();
            //const infoVenta = document.createTextNode(value);
            //celdaVenta.appendChild(infoVenta)
            ++k;
        }
    }
}

function cargarTablaPer() {
    const consultaPerRessultado = window.localStorage.getItem("tabla-consultaPer");
    //alert(consultaPerRessultado);
    const tablaPer = document.getElementById("tablaResultado");
    cargarCabeceras(tablaPer);
    console.log(JSON.parse(consultaPerRessultado));
    cargarCuerpoTabla(tablaPer, JSON.parse(consultaPerRessultado));
}

function main() {
    cargarTablaPer();
}

main();