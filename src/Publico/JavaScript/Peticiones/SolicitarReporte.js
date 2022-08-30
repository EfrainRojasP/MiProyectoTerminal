async function fetchSolicitarReporte(reporte) {
    console.log(reporte);
    const tokenGerente = window.localStorage.getItem("access-token");
    alert("HOLA")
    let response = await fetch("/GerenteRegional/SolicitarReporte",{
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenGerente,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(reporte)
    });
    
    let result = await response.json();
    return result;
}

document.forms[0].addEventListener("submit", async (e) =>{
    e.preventDefault();
    const solicitarReporte = new SolicitarReporte(fechaDeEntrega.value, descRpot.value);
    console.log(solicitarReporte);
    window.localStorage.setItem("reporte-solicitado", JSON.stringify(solicitarReporte));
    const response = await fetchSolicitarReporte(solicitarReporte);
    if(response.error){
        alert(response.error);
        return;
    }
    alert(response.exito);
    document.forms[0].submit();
});