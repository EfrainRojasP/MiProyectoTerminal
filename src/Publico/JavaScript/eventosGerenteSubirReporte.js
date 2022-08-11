var btnEnviar = document.getElementById("btnEnvia");
var btnCancelar = document.getElementById("btnCancela");

btnEnviar.disabled = true;
btnCancelar.disabled = true;

var subioarchivo = document.getElementById("archivoSubir");
//Añadimos el atributo accpet. Para que solo acepte archivos .csv y exel. Utilizamos los objetos MIME
subioarchivo.setAttribute("accept", ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

subioarchivo.onchange = function(){
    btnEnviar.disabled = false;
    btnCancelar.disabled = false;
    console.log("Hola")
};

btnCancelar.onclick = function(){
    btnEnviar.disabled = true;
    btnCancelar.disabled = true;
}

btnEnviar.onclick = function(){
    alert("El contenido del archivo se añadio a la base de datos");
}

