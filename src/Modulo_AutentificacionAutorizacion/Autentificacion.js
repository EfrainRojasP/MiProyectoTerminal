import * as bcrypt from 'bcrypt';

export class Autentificacion{

    validarUsuarioEmail(emailUser, LoginBD) {
        try {
            LoginBD.consultarEmailUsuario(emailUser);
            return emailUser;
        } catch (error) {
            return error;
        }
    }

    async validarPassword(password, emailUser, LoginBD){
        try {
            const passEncriptada = await LoginBD.consultarPasswordUsuario(emailUser);
            const coincide = await bcrypt.compare(password, passEncriptada);
            return coincide;
        } catch (error) {
            return error;
        }
    }
}