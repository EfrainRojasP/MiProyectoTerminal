const token = window.localStorage.getItem("access-token");


async function fetchValidar() {
    let valido;
    let response = await fetch('/Validar', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    console.log(response);
    if (!response.ok) {
        alert("La sesion expiro o no a ingresado")
        window.location.replace("/login.html");
    }
    //alert("uno")

}

const tiempo = () =>{
    const storege = window.localStorage.getItem("minutos");
    const minutos = parseInt(storege);
    const date = new Date();
    const minutosActuales = date.getMinutes();
    const timer = (Math.abs(minutos - minutosActuales) * 60000);
    return Math.abs(timer);
}

const reinicio = tiempo();
console.log(reinicio);

fetchValidar();



setTimeout(fetchValidar, 3600000);

    