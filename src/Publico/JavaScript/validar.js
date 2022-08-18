const token = window.localStorage.getItem("access-token");

console.log("HOLAAAA");

async function fetchValidar(){
    let response = await fetch('http://localhost:3200/validar', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    console.log(response);
    if (!response.ok) {
        return false;
    }

    let result = await response.json();

    return result;
}

async function main() {
    const res = await fetchValidar();
    if(!res){
        alert("La sesion expiro o no a ingresado")
        window.location.replace("http://localhost:3200/login.html");
    }
    
}

main();