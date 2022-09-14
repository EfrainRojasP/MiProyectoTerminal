import * as bcrypt from 'bcrypt';

export class Autentificacion{

    passUsuario;
    emailUser;

    /**
     * Constructor
     * @param {String} passUsuario Hash de la contraseña
     * @param {String} emailUser Email del usuario
     */
    constructor(passUsuario, emailUser) {
        this.passUsuario = passUsuario;
        this.emailUser = emailUser;
    }

    /**
     * Metodo que valida el usuario
     * @param {ConexionLoginBD} LoginBD Conexion a al BD Login
     * @returns True si es usuario existe en el sistema
     * @returns False si el usuaio no existe en el sistema
     */
    async validarUsuarioEmail(LoginBD) {
        try {
            const emial = await LoginBD.consultarEmailUsuario(this.emailUser);
            if(!emial){
                return false;
            }
            return true;
        } catch (error) {
            return error;
        }
    }

    /**
     * Metodo que valida si la contraseña del usario es correcta
     * @param {ConexionLoginBD} LoginBD Conexion a al BD Login
     * @returns True si la contraseña es correcta
     * @returns False si la contraseña es incorrecta
     */
    async validarPassword(LoginBD){
        try {
            const passEncriptada = await LoginBD.consultarPasswordUsuario(this.emailUser);
            if(!passEncriptada){
                return false;
            }
            const coincide = await bcrypt.compare(this.passUsuario, passEncriptada);
            return coincide;
        } catch (error) {
            throw error;
        }
        
    }
}