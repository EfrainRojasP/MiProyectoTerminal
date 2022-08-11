import { Router } from "express";

const cuentaRuter = Router();

cuentaRuter.post("/Ingresar", (req, res) =>{
    const body= req.body;
    console.log(body);
    res.json({rol: "1"});
    return res.send();
});

export default cuentaRuter;