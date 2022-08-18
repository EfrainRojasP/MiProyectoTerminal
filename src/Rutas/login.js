import { Router } from "express";
import { ManagerAutentificacionAutorizacion } from "../Modulo_AutentificacionAutorizacion/MangerAutentificacionAutorizacion.js";

const cuentaRuter = Router();

cuentaRuter.post("/Ingresar", async (req, res) =>{
    const {emailUser, passUser}= req.body;
    const ma = new ManagerAutentificacionAutorizacion(emailUser, passUser);
    const usuarioValido = await ma.validarEmailPass();
    if(!usuarioValido){
        console.log("USUARIO o PASS INCORRECTOS");
        return res.sendStatus(404);
    }
    const rolUsuario = await ma.rolUsuario();
    const token = await ma.crearToken("1h");
    console.log(token.JWT);
    //res.send(ma.crearToken());
    return res.json({
        rolUsuario: rolUsuario,
        token: token.JWT
    }).send();
});



export default cuentaRuter;