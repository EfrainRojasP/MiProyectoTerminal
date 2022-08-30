async function fetchVerificarReporte() {
    const tokenGerente = window.localStorage.getItem("access-token");
    let response = await fetch("/GerenteRegional/VerificarReporte",{
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenGerente,
        },
    });
    if(!response.ok){
        let result = await response.json();
        return result;
    }
    return response;
}

async function main (){
    let response = await fetchVerificarReporte();
    if(response.mensaje){
        alert(response.mensaje);
        window.location.replace(response.redirect);
    }
}

main();