import dotenv from "dotenv";

dotenv.config();

export class Correo{
    from;
    to;
    subject;
    text;

    /**
     * Constructor
     * @param {String} correoUsuario 
     */
    constructor(correoUsuario) {
        this.to = correoUsuario;
    }
    
    /**
     * Devuelve para quien ve el correo
     * @returns Devuelve para quien ve el correo
     */
    getTo(){
        return this.to;
    }

    /**
     * Metodo get para saber quien envia el correo
     * @returns Devuelve para quien va el correo
     */
    getFrom(){
        return this.from;
    }

    /**
     * Metodo get para saber el asusto del correo
     * @returns Devulve el asunto del correo
     */
    getSubject(){
        return this.subject;
    }

    /**
     * Metodo get para saber el contenido del correo
     * @returns Devulve el contenido del correo
     */
    getText(){
        return this.text;
    }
    
    /**
     * Metodo set, para inicializar el correo del usuario
     * @param {String} correoUsuario Correo del usuaio
     */
    setTo(correoUsuario){
        this.to = correoUsuario;
    }

    /**
     * Metodo set, para incializar a quien va dirigido el correo
     * @param {String} correoFuente Email para quien va dirigido el correo
     */
    setFrom(correoFuente){
        this.from = correoFuente;
    }

    /**
     * Metodo set, para inicializar el ausunto del correo que se va ha enviar
     * @param {String} asunto Asunto del email
     */
    setSubject(asunto){
        this.subject = asunto;
    }

    /**
     * Metodo set, para inicializar el contenido del correo, solo es un texto plano
     * @param {String} texto Texto del correo que se va ha enviar
     */
    setText(texto){
        this.text = texto;
    }

}