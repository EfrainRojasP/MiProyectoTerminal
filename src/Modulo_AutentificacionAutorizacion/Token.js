import { SignJWT, jwtVerify } from "jose";


export class Token{

    /**
     * Crea un token
     * @param {String} guid GUID del usuario
     * @param {String} email Email del usuario
     * @param {String} tiempoExpiraToken Tiempo en horas que el token dura
     * @returns Devuelve el token que se creo
     */
    async crearToken(guid, email, tiempoExpiraToken){
        const enconder = new TextEncoder();
        const jwtConstructor = new SignJWT({guid, email});
        const JWT = await jwtConstructor.setProtectedHeader({
            alg: "HS256", typ: "JWT"}).
            setIssuedAt().
            setExpirationTime(tiempoExpiraToken).
            sign(enconder.encode(process.env.KEY_TOKEN));
        return {JWT};
    }

    /**
     * Verifica el token
     * @param {String} token Token del usuario
     * @param {ConexionLoginBD} loginDB Conexion a la BD login
     * @returns Devulve verdadero si el token es valido
     * @returns Devulve false si el token no es valido o ha expirado
     */
    async verificarToken(token, loginDB){
        try {
            const enconder = new TextEncoder();
            const {payload} = await jwtVerify(
                token,
                enconder.encode(process.env.KEY_TOKEN)
            );
            console.log(payload);
            const existeGUID = await loginDB.consultarGUIDUsuario(payload.email);
            const existeEmail = await loginDB.consultarEmailUsuario(payload.email);
            const validacion = !existeEmail || existeGUID !== payload.guid ? false : true;
            return validacion;
        } catch (error) {
            return false;
        }
    }

    /**
     * Extre el GUID del usuario
     * @param {jwtVerify} token
     *  Token del usuaio
     * @returns Devuelve el GUID del usuario
     * @returns O devulve falso si el token expiro
     */
    async extraerGUID(token){
        try {
            const enconder = new TextEncoder();
            const {payload} = await jwtVerify(
                token,
                enconder.encode(process.env.KEY_TOKEN)
            );
            return payload.guid;
        } catch (error) {
            console.error("ERROR " + error);
            return false;
        }
    }


    /**
     * Extrae el email del usuaio
     * @param {jwtVerify} token
     *  Token del usuaio
     * @returns Devuelve el email del usuario
     * @returns O devuelve falso si el token expiro
     */
     async extraerEmail(token){
        try {
            const enconder = new TextEncoder();
            const {payload} = await jwtVerify(
                token,
                enconder.encode(process.env.KEY_TOKEN)
            );
            return payload.email;
        } catch (error) {
            console.error("ERROR " + error);
            return false;
        }
    }

}