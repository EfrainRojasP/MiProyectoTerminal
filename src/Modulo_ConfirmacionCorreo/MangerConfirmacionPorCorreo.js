import { Correo } from "./Correo.js";
import {google} from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { extraerToken } from "../Ayudas/Ayudas.js";
import { Token } from "../Modulo_AutentificacionAutorizacion/Token.js";

dotenv.config();

export class ManagerConfirmacionPorCorreo{
    correo;
    oAuth2;
    correoUsuario;

    /**
     * Constructor
     * @param {String} correoUsuario 
     */
    constructor(correoUsuario) {
        this.correoUsuario = correoUsuario;
        this.correo = new Correo();
        this.token = new Token();
    }

    /**
     * Metodo que genera la utentificacion OAuth2
     * @returns Devuelve la autentificacion OAuth2
     */
    generarOAuth2(){
        const oAuth2 = new google.auth.OAuth2(process.env.ID_CLIENTE, process.env.SECRETO_CLIENTE, process.env.REDIRECT_URL);

        oAuth2.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

        return oAuth2;
    }

    /**
     * Metodo que envia el correo
     * @param {String} authorization Token
     * @returns Devuelve True, si todo slio bien
     * @returns Devuelve False, si hubo un error
     */
    async enviarCorreo(authorization){
        try {
            const tokenEncargado = extraerToken(authorization);
            this.correoUsuario = await this.token.extraerEmail(tokenEncargado);
            console.log("COREERO " + this.correoUsuario);
            this.oAuth2 = this.generarOAuth2();
            this.oAuth2.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
            const accesToken = await this.oAuth2.getAccessToken();
            const tranporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.EMAIL_USER,
                    clientId: process.env.ID_CLIENTE,
                    clientSecret: process.env.SECRETO_CLIENTE,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accesToken
                }
            });
            this.correo.setFrom("Sistema de verificacion " + "<" + process.env.EMAIL_USER + ">");
            this.correo.setTo(this.correoUsuario);
            this.correo.setSubject("Entraga de reporte");
            this.correo.setText("Ha realizado con exito la entraga del reporte");
            const result = await tranporter.sendMail(this.correo);
            return true;
        } catch (error) {
            console.error("ERROR AL ENVIAR CORREO " + error.stack);
            return false;
        }
    }

}