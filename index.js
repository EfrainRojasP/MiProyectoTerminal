console.clear();

import createExpressServer, { request, response } from "express";
import { ConexionLoginBD } from "./src/ConexionBD/ConexionLoginBD.js";
import fileUpload from "express-fileupload";
import cuentaRuter from "./src/Rutas/login.js";
import redirecPOST from "./src/Rutas/redireccionarPOST.js";
import dotenv from "dotenv";
import { ConexionVentasDB } from "./src/ConexionBD/ConexionVentasDB.js";
import peticionesGerente from "./src/Modulo_Consultas/peticionesConsultas.js";
import { subirInformacion } from "./src/Modulo_SubirInformacion/peticionesSubirInformacion.js";


dotenv.config();
const expressApp = createExpressServer();
const PUERTO = process.env.PUERTO;

expressApp.use(createExpressServer.json());
expressApp.use(createExpressServer.text());
expressApp.use(fileUpload());

expressApp.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
    next(err);
});
expressApp.use(createExpressServer.static("./src/Publico"));
expressApp.use("/login.html", cuentaRuter);
expressApp.use("", redirecPOST);
expressApp.use("/GrenteRegional", peticionesGerente);
expressApp.use("/Encargado", subirInformacion)

const main = async () => {
    const crearConexionLogin = new ConexionLoginBD();
    const crearConexionVentas = new ConexionVentasDB();
    try {
        await crearConexionLogin.iniciarConexionMYSQL();
        await crearConexionVentas.iniciarConexionMYSQL();
    } catch (error) {
        console.error("ERROR EN LA CONEXION A LA BD", error);
        throw error;
    }
    expressApp.listen(PUERTO, (request, response) => {
        console.log("Servidor en el puerto: " + PUERTO);
    });
};

main();