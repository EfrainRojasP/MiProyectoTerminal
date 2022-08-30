/*const guidReporte = document.getElementById("GUIDReporte");
const fechaLimite = document.getElementById("fechaLimiteReporte");
const descRepor = document.getElementById("descReporte");
const fechaSolRepor = document.getElementById("fechaSolicitudReporte")*/

async function fetchCargarReporte() {
    const tokenGerente = window.localStorage.getItem("access-token");
    let response = await fetch("/GerenteRegional/InformacionReporte", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenGerente,
        },
    });
    let result = await response.json();
    return result;
}

function cargarInformacion(informacionReporte) {
    const guidReporte = document.getElementById("GUIDReporte");
    const fechaLimite = document.getElementById("fechaLimiteReporte");
    const descRepor = document.getElementById("descReporte");
    const fechaSolRepor = document.getElementById("fechaSolicitudReporte")
    guidReporte.textContent = informacionReporte.GUIDReporte;
    fechaLimite.textContent = informacionReporte.fechaLimite;
    fechaSolRepor.textContent = informacionReporte.fechaSolicitud;
    descRepor.textContent = informacionReporte.decripcionReporte;
}

async function main() {
    const response = await fetchCargarReporte();
    console.log(response);
    if (response.error) {
        alert(response.error);
    }
    cargarInformacion(response);
}

main();