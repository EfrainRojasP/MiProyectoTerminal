import { SignJWT, jwtVerify } from "jose";


export class Token{

    /**
     * 
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
     * 
     * @returns 
     * Devulve verdadero si el token es valido
     * Devulve false si el token no es valido o ha expirado
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
     * 
     * @param {jwtVerify} token
     *  Token del usuaio
     * @returns 
     *  El GUID del usuario o falso si el token expiro
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
            return false;
        }
    }

}