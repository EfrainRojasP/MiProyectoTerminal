import { Router } from "express";
import { send } from "process";
import * as url from 'url';
import { ConexionLoginBD } from "../ConexionBD/ConexionLoginBD.js";
import { Token } from "../Modulo_AutentificacionAutorizacion/Token.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('../Publico', import.meta.url));


const redirecPOST = Router();

/**
 * Validamos el gerente
 */
redirecPOST.post("/Validar/Gerente", async (req, res) => {
    const { authorization } = req.headers;
    const userToken = authorization.substring(7) !== "null" ?
                    authorization.substring(7) : false;
    if (!authorization || !userToken) {
        return res.status(404).send("LA SESION EXPIRO O NO ESTA LOGEADO");
    }
    const token = new Token();
    const conexionBDLogin = new ConexionLoginBD();
    const valido = await token.verificarToken(userToken, conexionBDLogin);
    if (!valido) {
        return res.status(404).send("LA SESION EXPIRO O NO ESTA LOGEADO");
    }
    return res.send();
});

redirecPOST.post("/GerenteRegional/index.html", (req, res) =>{
    //res.send(__dirname)
    return res.sendFile(__dirname + "/GerenteRegional/index.html");
});

redirecPOST.post("/Encargado/EncargadoSubirReporte.html", (req, res) =>{
    //res.send(__dirname)
    return res.sendFile(__dirname + "/Encargado/EncargadoSubirReporte.html");
});

export default redirecPOST;