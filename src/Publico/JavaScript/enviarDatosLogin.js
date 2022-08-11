const formulario = document.forms[0];

const emailUser = document.getElementById("nombreUsario");
const passUsuario = document.getElementById("passUsuario");

formulario.addEventListener("submit", async function (e) {
    e.preventDefault();
    const login  = {
        emailUser: emailUser.value,
        passUser: passUsuario.value
    };
    console.log(login);
    const res = await peticionFetch(login);
    alert(res.rol);
    console.log("sdsad", res.rol);
    if(res.rol === "1"){
        formulario.action = "../GerenteRegional/index.html"
    } else {
        formulario.action = "../Encargado/EncargadoSubirReporte.html"
    }
    document.forms[0].submit();
});

async function peticionFetch(obj) {
    let response = await fetch('http://localhost:3200/login.html/Ingresar', {
        method: 'POST',
     headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    });

    let result = await response.json();
    //console.log(JSON.stringify(result));
    if (result) {
        alert(result);
    }
    
    return JSON.parse(JSON.stringify(result));
}