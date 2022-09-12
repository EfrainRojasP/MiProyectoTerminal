import { Router } from "express";
import { ManagerSolicitarReporte } from "./ManagerSolicitarReporte.js";

const solicitarReporteGente = Router();

solicitarReporteGente.post("/SolicitarReporte", async (req, res) =>{
    const reporteGerente = req.body;
    const { authorization } = req.headers
    const ma = new ManagerSolicitarReporte(reporteGerente, authorization);
    const mensaje = await ma.insertarReporteBD();
    const mensaje2 = await ma.insertarReporteEncargadoBD();
    if(mensaje.hasOwnProperty('error')){
        return res.status(404).json(mensaje);
    }
    if(mensaje2.hasOwnProperty('error')){
        return res.status(404).json(mensaje2);
    }
    return res.json(mensaje);
});

solicitarReporteGente.post("/VerificarReporte", async (req, res) =>{
    console.log("SOLICITO REPORTE");
    const reporteGerente = req.body;
    const { authorization } = req.headers
    const ma = new ManagerSolicitarReporte(reporteGerente, authorization);
    const resp = await ma.puedoSolicitarReporte();
    //console.log("RESP " + resp);
    if(typeof resp !== "object"){
        return res.send();
    }
    return res.status(403).json(resp)
});

solicitarReporteGente.post("/InformacionReporte", async (req, res) =>{
    //console.log("SOLICITO INFO REPORTE");
    const reporteGerente = req.body;
    const { authorization } = req.headers
    const ma = new ManagerSolicitarReporte(reporteGerente, authorization);
    const resp = await ma.informacionReporte();
    //console.log("885 ", resp);
    return res.json(resp)
});

export default solicitarReporteGente;