import { Router } from "express";
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('../Publico', import.meta.url));


const redirecPOST = Router();

redirecPOST.post("/GerenteRegional/index.html", (req, res) =>{
    //res.send(__dirname)
    res.sendFile(__dirname + "/GerenteRegional/index.html");
});

redirecPOST.post("/Encargado/EncargadoSubirReporte.html", (req, res) =>{
    //res.send(__dirname)
    res.sendFile(__dirname + "/Encargado/EncargadoSubirReporte.html");
});

export default redirecPOST;