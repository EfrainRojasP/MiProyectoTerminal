import { Router } from "express";
import { extraerToken } from "../Ayudas/Ayudas.js";
import { Token } from "../Modulo_AutentificacionAutorizacion/Token.js";
import { ManagerConsultas } from "./ManagerConsultas.js";

const peticionesGerente = Router();
export const peticionesEngardao = Router();

peticionesGerente.post("/TodasLasVentas", async (req, res) =>{
    //console.log("PETICION DE VENTAS");
    const { authorization } = req.headers;
    const tokenGerente = authorization.substring(7)
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    //console.log("DASDSADSADSADA "  + GUID);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultarTodasLasVentas();
    if(!resConsulta){
        return res.sendStatus(401);
    }
    return res.json(resConsulta).send();
});

peticionesGerente.post("/ConsultaPersonalizada", async (req, res) =>{
    //console.log("ENTREEEEEEEEEEEEEEEE");
    const { authorization } = req.headers;
    //console.log("dawdwad " + authorization);
    const consultaPer = req.body;
    //console.log(JSON.stringify(consultaPer));
    //console.log(consultaPer.porProducto);
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
    //console.log("PETICION DE VENTAS");
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
    //console.log("PETICION DE VENTAS");
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
    //console.log("PETICION DE VENTAS");
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
    //console.log("PETICION DE VENTAS");
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
    //console.log("PETICION DE VENTAS");
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


peticionesGerente.post("/Reportes/CuantosReportes", async (req, res) =>{
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.cuantosReporte();
    if(resConsulta.error){
        return res.status(403).json(resConsulta);
    }
    return res.json(resConsulta);
});

peticionesGerente.post("/Reportes/CuantosReportesEntregados", async (req, res) =>{
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.cuantosReportesEntregados();
    if(resConsulta.error){
        return res.status(403).json(resConsulta);
    }
    return res.json(resConsulta);
});

peticionesGerente.post("/Reportes/TablaReportes", async (req, res) =>{
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.tablaEstadoReportes();
    if(resConsulta.error){
        return res.status(403).json(resConsulta);
    }
    return res.json(resConsulta);
});


peticionesEngardao.post("/FechaEntraga", async(req, res) =>{
    const { authorization } = req.headers;
    const tokenGerente = extraerToken(authorization);
    const token = new Token();
    const GUID = await token.extraerGUID(tokenGerente);
    const mc = new ManagerConsultas(GUID);
    const resConsulta = await mc.consultarFechaEntregaReporteEncargado();
    if(resConsulta.error){
        return res.status(403).json(resConsulta);
    }
    return res.json(resConsulta);
});

export default peticionesGerente;
