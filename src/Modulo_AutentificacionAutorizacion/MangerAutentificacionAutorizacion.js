import { Autentificacion } from "./Autentificacion.js";
import { Autorizacion } from "./Autorizacion.js";
import {ConexionLoginBD} from "../ConexionBD/ConexionLoginBD.js"
import { Token } from "./Token.js";


export class ManagerAutentificacionAutorizacion{
    autentificacion;
    autorizacion;
    conexionBDLogin;
    email;
    passUsuario;
    token;

    constructor(email, passUsuario) {
        this.email = email;
        this.passUsuario = passUsuario;
    }

    async validarEmailPass(){
        this.conexionBDLogin = new ConexionLoginBD();
        this.autentificacion = new Autentificacion(this.passUsuario, this.email);
        const emailUser = await this.autentificacion.validarUsuarioEmail(this.conexionBDLogin);
        const passUser = await this.autentificacion.validarPassword(this.conexionBDLogin);
        if(!emailUser || !passUser){
            return false;
        }
        return true;
    }

    async rolUsuario(){
        this.conexionBDLogin = new ConexionLoginBD();
        this.autorizacion = new Autorizacion(this.email);
        const rolUsuaio = await this.autorizacion.getROL(this.conexionBDLogin);
        return rolUsuaio;
    }

    async crearToken(tiempoDeVidaToken){
        this.conexionBDLogin = new ConexionLoginBD();
        const GUID = await this.conexionBDLogin.consultarGUIDUsuario(this.email);
        this.token = new Token();
        return this.token.crearToken(GUID,this.email, tiempoDeVidaToken);
    }

}