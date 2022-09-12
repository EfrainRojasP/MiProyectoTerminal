
const tokenT = window.localStorage.getItem("access-token");
console.log(tokenT);


async function cargarTabla() {
    const header = document.createElement('thead');
    const tabla = document.getElementById("tablaVentas");
    tabla.appendChild(header);
    console.log(tabla);
    const ventas = await fetchTablaVentas();
    const cabeceras = ["Fecha de la venta", "Cantidad", "Producto", "Precio", "Sucursal", "Entidad", "Municipio/Alcaldia"];
    const cabeceras2 = ["Fecha_de_la_venta", "Cantidad", "Producto", "Precio"
    , "Sucursal", "Entidad", "Municipio_Alcaldia"];
    const filaCabecera = header.appendChild(document.createElement("tr"));
    for (let i = 0; i < cabeceras.length; i++) {
        filaCabecera.appendChild(document.createElement("th")).appendChild(document.createTextNode(cabeceras[i]));
    }
    const body = document.createElement("tbody");
    tabla.appendChild(body);
    for (let i = 0; i < ventas.length; i++) {
        const filaVenta = body.appendChild(document.createElement("tr"));
        const obj = ventas[i];
        let k = 0;
        for (const key in obj){
            const value = obj[key];
            if(value !== undefined){
                const celdaVenta = filaVenta.appendChild(document.createElement("td"));
                celdaVenta.setAttribute("class", cabeceras2[k]);
                const infoVenta = document.createTextNode(value);
                celdaVenta.appendChild(infoVenta);
                ++k;
            }
        }
    }
}

async function fetchTablaVentas() {
    let response = await fetch('/GrenteRegional/TodasLasVentas', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenT
        }
    });
    if (!response.ok) {
        return false;
    }

    let result = await response.json();

    return result;
}

cargarTabla();