const token = window.localStorage.getItem("access-token");

async function fetchValidar() {
    let valido;
    let response = await fetch('http://localhost:3200/Validar/Gerente', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    console.log(response);
    if (!response.ok) {
        alert("La sesion expiro o no a ingresado")
        window.location.replace("http://localhost:3200/login.html");
    }
}

fetchValidar();