import { Router } from "express";
import dotenv from "dotenv";
import { ManagerConfirmacionPorCorreo } from "./MangerConfirmacionPorCorreo.js";

dotenv.config();

const enviarCorreo = Router();

enviarCorreo.post("/EnviarCorreo/ReporteExito", async (req, res) =>{
    try {
        const {email} = req.body;
        //console.log(email);
        const ma = new ManagerConfirmacionPorCorreo(email);
        const exito = await ma.enviarCorreo();
        if(exito !== true){
            return res.sendStatus(404);
        }
        return res.send();
    } catch (error) {
        return res.sendStatus(404);
        console.error("ERROR " + error.stack);
    }
});

export default enviarCorreo;