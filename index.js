console.clear();

import createExpressServer, { request, response } from "express";
import { ConexionLoginBD } from "./src/ConexionBD/ConexionLoginBD.js";
import { Autentificacion } from "./src/Modulo_AutentificacionAutorizacion/Autentificacion.js";
import cuentaRuter from "./src/Rutas/login.js";
import dotenv from "dotenv";


dotenv.config();
const expressApp = createExpressServer();
const PUERTO = process.env.PUERTO;

expressApp.use(createExpressServer.json());
expressApp.use(createExpressServer.text());
expressApp.use(createExpressServer.static("./src/Publico"))
expressApp.use("/login.html", cuentaRuter);

const main = async () =>{
    const crearConexionLogin = new ConexionLoginBD();
    const auth = new Autentificacion();
    try {
        await crearConexionLogin.iniciarConexionMYSQL();
    } catch (error) {
        console.error("ERROR EN LA CONEXION A LA BD", error);
        return;
    }
    expressApp.listen(PUERTO, (request, response) =>{
        console.log("Servidor en el puerto: " + PUERTO);
    });
};

main();