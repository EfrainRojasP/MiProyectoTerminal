function entrar(){
    var nomUser = document.getElementById("nombreUsario");
    var passUser = document.getElementById("passUsuario");
    var tamUser = nomUser.value.length;
    var tamPassUser = passUser.value.length
    if(tamUser == 0){
        alert("Ingrese correo usuario o correo electronico");
    } else if (tamPassUser == 0){
        alert("Ingrese contraseña")
    } else if (tamPassUser == 0 && tamUser == 0){
        alert("Ingresere usuario y contraseña");
    }
}