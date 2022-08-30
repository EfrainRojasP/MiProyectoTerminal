//const tokenU

async function peticionFetchConsulta(obj) {
    let response = await fetch('http://localhost:3200/GrenteRegional/ConsultaPersonalizada', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenU,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    });
    if (!response.ok) {
        return false;
    }

    let result = await response.json();

    return result;
}

document.forms[0].addEventListener("submit", async function (e) {
    e.preventDefault();
    alert(tokenU);
    const consulta = window.localStorage.getItem("consulta");
    const resJSON = await peticionFetchConsulta(consultar);
    if (!resJSON) {
        alert("Nusestra base de datos indica que la consulta realizada esta vacia. Porfavor " + 
        "vuelva a realizar la consulta pero con otros valores");
        return;
    }
    window.localStorage.setItem("tabla-consultaPer", JSON.stringify(resJSON));
    document.forms[0].submit();
});