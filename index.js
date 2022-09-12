console.clear();

import * as url from 'url';

import createExpressServer, { request, response } from "express";
import favicon from "serve-favicon";
import { ConexionLoginBD } from "./src/ConexionBD/ConexionLoginBD.js";
import { ConexionVentasDB } from "./src/ConexionBD/ConexionVentasDB.js";
import { subirInformacion } from "./src/Modulo_SubirInformacion/peticionesSubirInformacion.js";
import { ConexionReporteDB } from "./src/ConexionBD/ConexionReporteBD.js";
import peticionesGerente, { peticionesEngardao } from "./src/Modulo_Consultas/peticionesConsultas.js";
import solicitarReporteGente from "./src/Modulo_SolicitarReporte/peticionSolicitarReporte.js";
import generarHistorico from "./src/Modulo_GeneradorHistorico/peticionGenerarHistorico.js";
import generarGrafico from "./src/Modulo_GeneracionGrafico/peticionGrafico.js"
import fileUpload from "express-fileupload";
import cuentaRuter from "./src/Rutas/login.js";
import redirecPOST from "./src/Rutas/redireccionarPOST.js";
import dotenv from "dotenv";
import path from 'path';


dotenv.config();

const __dirname = url.fileURLToPath(new URL('../ProyectoTerminal/src/Publico', import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

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
console.log(__dirname + " " + __filename);
expressApp.use("/login.html", cuentaRuter);
expressApp.use("", redirecPOST);
expressApp.use("/GrenteRegional", peticionesGerente);
expressApp.use("/GerenteRegional", solicitarReporteGente);
expressApp.use("/GerenteRegional", generarGrafico)
expressApp.use("/Encargado", subirInformacion);
expressApp.use("/Encargado", generarHistorico);
expressApp.use("/Encargado", peticionesEngardao);
expressApp.use(favicon(path.join("./src/Publico/Imagenes/favicon.ico")));

const main = async () => {
    const crearConexionLogin = new ConexionLoginBD();
    const crearConexionVentas = new ConexionVentasDB();
    const crearConexionReporte = new ConexionReporteDB();
    try {
        await crearConexionLogin.iniciarConexionMYSQL();
        await crearConexionVentas.iniciarConexionMYSQL();
        await crearConexionReporte.iniciarConexionMYSQL();
    } catch (error) {
        console.error("ERROR EN LA CONEXION A LA BD", error);
        throw error;
    }
    expressApp.listen(PUERTO, (request, response) => {
        console.log("Servidor en el puerto: " + PUERTO);
    });
};

main();