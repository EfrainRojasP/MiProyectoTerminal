import dotenv from "dotenv";

dotenv.config();

export class Correo{
    from;
    to;
    subject;
    text;

    constructor(correoUsuario) {
        this.to = correoUsuario;
    }
    
    getTo(){
        return this.to;
    }

    getFrom(){
        return this.from;
    }

    getSubject(){
        return this.subject;
    }

    getText(){
        return this.text;
    }

    setTo(correoUsuario){
        this.to = correoUsuario;
    }

    setFrom(correoFuente){
        this.from = correoFuente;
    }

    setSubject(asunto){
        this.subject = asunto;
    }

    setText(texto){
        this.text = texto;
    }

}