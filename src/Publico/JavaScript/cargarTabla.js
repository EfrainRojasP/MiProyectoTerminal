
const tokenT = window.localStorage.getItem("access-token");
console.log(tokenT);


async function cargarTabla() {
    const tabla = document.getElementById("tablaVentas");
    console.log(tabla);
    const ventas = await fetchTablaVentas();
    const cabeceras = ["Fecha de la venta", "Cantidad", "Producto", "Precio", "Sucursal", "Entidad", "Municipio/Alcaldia"];
    const filaCabecera = tabla.insertRow();
    for (let i = 0; i < cabeceras.length; i++) {
        const celdaCabecera = filaCabecera.insertCell();
        const tituloCabecera = document.createTextNode(cabeceras[i]);
        celdaCabecera.appendChild(tituloCabecera);
    }
    for (let i = 0; i < ventas.length; i++) {
        const filaVenta = tabla.insertRow();
        const obj = ventas[i];
        for (const key in obj){
            const value = obj[key];
            if(value !== undefined){
                const celdaVenta = filaVenta.insertCell();
                const infoVenta = document.createTextNode(value);
                celdaVenta.appendChild(infoVenta);
            }
        }
    }
}

async function fetchTablaVentas() {
    let response = await fetch('http://localhost:3200/GrenteRegional/TodasLasVentas', {
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