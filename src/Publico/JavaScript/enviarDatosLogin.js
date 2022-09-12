const formulario = document.forms[0];

const emailUser = document.getElementById("nombreUsario");
const passUsuario = document.getElementById("passUsuario");

function guardarToken(token) {
    window.localStorage.setItem("access-token", token);
}

formulario.addEventListener("submit", async function (e) {
    e.preventDefault();
    const login = {
        emailUser: emailUser.value,
        passUser: passUsuario.value
    };
    //console.log(login);
    const resJSON = await peticionFetch(login);
    console.log(resJSON.token);
    guardarToken(resJSON.token);
    if (!resJSON) {
        alert("USUARIO O CONTRASEÑA INCORRECTOS");
        return;
    }
    if (resJSON.rolUsuario === 1) {
        formulario.action = "../GerenteRegional/index.html"
    } else {
        formulario.action = "../Encargado/EncargadoSubirReporte.html"
    }
    const date = new Date();
    const minutos = date.getMinutes();
    window.localStorage.setItem("minutos", minutos.toString());
    alert(minutos)
    document.forms[0].submit();
});

async function peticionFetch(obj) {
    let response = await fetch('/login.html/Ingresar', {
        method: 'POST',
        headers: {
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