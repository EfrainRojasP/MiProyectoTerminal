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

document.forms[0].addEventListener("submit", async (e) => {
    e.preventDefault();
    const archivo = document.getElementById("archivoSubir");
    const res = await peticionFetchSubirArch(archivo);
    console.log(res.error);
    if(typeof res === "object"){
        alert (res.error);
        window.location.reload();
        return;
    }
    document.forms[0].action = res;
    document.forms[0].submit();
});