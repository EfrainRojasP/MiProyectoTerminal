async function peticionFetchSubirArch(archivo) {
    const tokenEncargado = window.localStorage.getItem("access-token");
    const fromData = new FormData();
    const archivoCSV = archivo.files[0];
    fromData.append("CSV", archivoCSV)
    let response = await fetch('/Encargado/SubirArchivo', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenEncargado,
        },
        body: fromData
    });
    let result;
    if (!response.ok) {
        result = await response.json();
        return result;
    }
    return response.url;
}

async function fetchHistorico() {
    const tokenEncargado = window.localStorage.getItem("access-token");
    let response = await fetch('/Encargado/GenerarHistorico', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenEncargado,
        },
    });
    let result = await response.json();
    return result;
}

document.forms[0].addEventListener("submit", async (e) => {
    e.preventDefault();
    const btnE = document.getElementById("btnEnvia");
    const btnC = document.getElementById("btnCancela");
    btnC.disabled = true;
    btnE.disabled = true;
    const estado = document.getElementById("estado");
    estado.textContent = "Porfavor no salgas de la pagina, estamos subiendo el archivo";
    const archivo = document.getElementById("archivoSubir");
    const res = await peticionFetchSubirArch(archivo);
    if (res.error) {
        alert(res.error);
        //window.location.reload();
        return;
    }
    estado.textContent = "El archivo se subio con exito";
    estado.textContent = "Por favor no salgas de la pagina, estamos añadiendo el contenido del archivo a la base de datos";
    const resHis = await fetchHistorico();
    if(resHis.error){
        alert(resHis.error);
        return;
    }
    estado.textContent = "Todo resulto bien :D"
    document.forms[0].action = res;
    document.forms[0].submit();
});