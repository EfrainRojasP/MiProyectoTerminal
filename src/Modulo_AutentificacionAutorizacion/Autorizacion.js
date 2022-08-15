export class Autorizacion{

    emailUsuario;
    rolUsuaio;

    constructor(emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    async getROL(LoginBD) {
        this.rolUsuaio = await LoginBD.consultarRolUsuario(this.emailUsuario);
        return this.rolUsuaio;        
    }
}