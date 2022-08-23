import { Router } from "express";
import { extraerToken } from "../Ayudas/Ayudas.js";
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

peticionesGerente.post("/ConsultaPersonalizada", async (req, res) =>{
    console.log("ENTREEEEEEEEEEEEEEEE");
    const { authorization } = req.headers;
    console.log("dawdwad " + authorization);
    const consultaPer = req.body;
    console.log(JSON.stringify(consultaPer));
    console.log(consultaPer.porProducto);
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultaPersonalizada(consultaPer);
    if(!resConsulta){
        return res.sendStatus(401);
    }
    return res.json(resConsulta).send();
    
});

peticionesGerente.post("/SucursaresACargo", async (req, res) =>{
    console.log("PETICION DE VENTAS");
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultarSucursalesACargo();
    if(!resConsulta){
        return res.sendStatus(401);
    }
    return res.json(resConsulta).send();
});

peticionesGerente.post("/SucursaresACargo/MunAlca", async (req, res) =>{
    console.log("PETICION DE VENTAS");
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultarSucursalesACargo_MunAlca();
    if(!resConsulta){
        return res.sendStatus(401);
    }
    return res.json(resConsulta).send();
});

peticionesGerente.post("/SucursaresACargo/Entidad", async (req, res) =>{
    console.log("PETICION DE VENTAS");
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultarSucursalesACargo_Entidad();
    if(!resConsulta){
        return res.sendStatus(401);
    }
    return res.json(resConsulta).send();
});

peticionesGerente.post("/SucursaresACargo/Producto", async (req, res) =>{
    console.log("PETICION DE VENTAS");
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultarSucursalesACargo_Producto();
    if(!resConsulta){
        return res.sendStatus(401);
    }
    return res.json(resConsulta).send();
});


peticionesGerente.post("/SucursaresACargo/TipoProducto", async (req, res) =>{
    console.log("PETICION DE VENTAS");
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultarSucursalesACargo_TipoProducto();
    if(!resConsulta){
        return res.sendStatus(401);
    }
    return res.json(resConsulta).send();
});


export default peticionesGerente;