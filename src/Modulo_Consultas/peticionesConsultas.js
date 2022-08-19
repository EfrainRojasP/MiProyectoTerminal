import { Router } from "express";
import { Token } from "../Modulo_AutentificacionAutorizacion/Token.js";
import { ManagerConsultas } from "./ManagerConsultas.js";

const peticionesGerente = Router();

peticionesGerente.post("/TodasLasVentas", async (req, res) =>{
    console.log("PETICION DE VENTAS");
    const { authorization } = req.headers;
    const tokenGerente = authorization.substring(7)
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultarTodasLasVentas();
    if(!resConsulta){
        return res.sendStatus(401);
    }
    return res.json(resConsulta).send();
});

export default peticionesGerente;