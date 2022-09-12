async function fetchVerificarReporteEntregado() {
    const tokenEncargado = window.localStorage.getItem("access-token");
    let response = await fetch("/Encargado/VerificarReporteEntregado",{
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenEncargado,
        },
    });
    let result = await response.json();
    return result;
}

async function main (){
    let response = await fetchVerificarReporteEntregado();
    console.log("HOLAAAAAAAAA", response);
    if(response.mensaje){
        console.log("HOLA");
        alert(response.mensaje);
        window.location.replace(response.redirect);
    }
}

main();