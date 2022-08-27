import { Router} from "express";
import { ManagerArchivo } from "./ManagerArchivo.js";


export const subirInformacion = Router();

subirInformacion.post("/SubirArchivo", async (req, res, next) =>{
    const { authorization } = req.headers;
    const {CSV} = req.files;
    if(!authorization || !CSV){
        return res.status(422).json({
            error: "Archivo archivo incorrecto"
        });
    }
    try {
        const ma = new ManagerArchivo(CSV);
        const resA = await ma.guardarArchivo(authorization);
        console.log(resA, " tipo " + typeof resA);
        if(typeof resA == "object"){
            return res.status(422).json(resA);
        }
        return res.redirect("../Encargado/EncargadoSinReporte.html");
    } catch (error) {
        console.error("EOROR " + error);
        next(error);
        return res.redirect("../Encargado/EncargadoSubirReporte.html");
    }
});