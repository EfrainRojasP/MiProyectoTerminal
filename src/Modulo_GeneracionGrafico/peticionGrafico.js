import { Router } from "express";
import { ManagerGeneracionGrafico } from "./ManagerGeneracionGrafico.js";

const generarGrafico = Router();

generarGrafico.post("/GenerarGrafico", (req, res) =>{
    //console.log("HOLA");
    const graficoGerente = req.body;
    //console.log(graficoGerente);
    const ma = new ManagerGeneracionGrafico(graficoGerente);
    const grafico = ma.generarObjetoGrafico();
    c//onsole.log(grafico);
    return res.json(grafico);
});

export default generarGrafico;