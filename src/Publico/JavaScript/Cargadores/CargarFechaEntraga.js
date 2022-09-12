async function fetchFechaEntrega() {
    const tokenEncargado = window.localStorage.getItem("access-token");
    let response = await fetch("/Encargado/FechaEntraga", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenEncargado,
        },
    });

    let result = await response.json();
    return result;
}


async function cargarFecha() {
    const fecha = await fetchFechaEntrega();
    console.log(fecha);
    const fechaLimite = document.getElementById("fechaLimite");
    fechaLimite.textContent = fecha;
}

cargarFecha();