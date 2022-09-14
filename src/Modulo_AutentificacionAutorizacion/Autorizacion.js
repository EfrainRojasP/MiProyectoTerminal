export class Autorizacion{

    emailUsuario;
    rolUsuaio;

    /**
     * Constructor
     * @param {String} emailUsuario Email del ususario
     */
    constructor(emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    /**
     * Comprueba que el rol que tiene el usuario, gerente regional o encargado
     * @param {ConexionLoginBD} LoginBD 
     * @returns Devulve el rol que tiene el usuario
     */
    async getROL(LoginBD) {
        this.rolUsuaio = await LoginBD.consultarRolUsuario(this.emailUsuario);
        return this.rolUsuaio;        
    }
}