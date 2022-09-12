import { Router } from "express";
import { ManagerGeneradorHistorico } from "./ManagerGeneradorHistorico.js";

const generarHistorico = Router();

generarHistorico.post("/GenerarHistorico", async (req, res) => {
    const { authorization } = req.headers;
    console.log(authorization);
    const ma = new ManagerGeneradorHistorico(authorization);
    const a = await ma.generarHistorico();
    const b = await ma.actualizarEstadoReporte();
    if(a.error || b.error){
        return res.status(405).json(a);
    }
    return res.json(a);
});

generarHistorico.post("/VerificarReporteEntregado", async (req, res) =>{
    const { authorization } = req.headers;
    const ma = new ManagerGeneradorHistorico(authorization);
    const permitido = await ma.verificarEntrgaReporte();
    if(permitido.error){
        return res.status(405).json(permitido)
    }
    if(permitido.mensaje){
        return res.json(permitido);
    }
    return res.send();
});

export default generarHistorico;