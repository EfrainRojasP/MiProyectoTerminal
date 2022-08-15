import * as bcrypt from 'bcrypt';

export class Autentificacion{

    passUsuario;
    emailUser;

    constructor(passUsuario, emailUser) {
        this.passUsuario = passUsuario;
        this.emailUser = emailUser;
    }

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