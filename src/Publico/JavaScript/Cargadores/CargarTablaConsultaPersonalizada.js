function cargarCabeceras(tabla) {
    const cabeceras = ["Fecha de la venta", "Cantidad", "Producto", "Precio",
        "Tipo Producto", "Sucursal", "Entidad", "Municipio/Alcaldia"];
    const filaCabecera = tabla.insertRow();
    for (let i = 0; i < cabeceras.length; i++) {
        const celdaCabecera = filaCabecera.insertCell();
        const tituloCabecera = document.createTextNode(cabeceras[i]);
        celdaCabecera.appendChild(tituloCabecera);
    }
}

function cargarCuerpoTabla(tabla, tablaRes) {
    for (let index = 0; index < tablaRes.length; index++) {
        const filaVenta = tabla.insertRow();
        const element = tablaRes[index];
        console.log(typeof element);
        for (const key in element) {
            const value = element[key];
            const celdaVenta = filaVenta.insertCell();
            const infoVenta = document.createTextNode(value);
            celdaVenta.appendChild(infoVenta)
        }
    }
}

function cargarTablaPer() {
    const consultaPerRessultado = window.localStorage.getItem("tabla-consultaPer");
    alert(consultaPerRessultado);
    const tablaPer = document.getElementById("tablaResultado");
    cargarCabeceras(tablaPer);
    console.log(JSON.parse(consultaPerRessultado));
    cargarCuerpoTabla(tablaPer, JSON.parse(consultaPerRessultado));
}

function main() {
    cargarTablaPer();
}

main();