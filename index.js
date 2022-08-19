console.clear();

import createExpressServer, { request, response } from "express";
import { ConexionLoginBD } from "./src/ConexionBD/ConexionLoginBD.js";

import cuentaRuter from "./src/Rutas/login.js";
import redirecPOST from "./src/Rutas/redireccionarPOST.js";
import dotenv from "dotenv";
import { ConexionVentasDB } from "./src/ConexionBD/ConexionVentasDB.js";
import peticionesGerente from "./src/Modulo_Consultas/peticionesConsultas.js";


dotenv.config();
const expressApp = createExpressServer();
const PUERTO = process.env.PUERTO;

expressApp.use(createExpressServer.json());
expressApp.use(createExpressServer.text());


expressApp.use(createExpressServer.static("./src/Publico"));
expressApp.use("/login.html", cuentaRuter);
expressApp.use("", redirecPOST);
expressApp.use("/GrenteRegional", peticionesGerente);

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