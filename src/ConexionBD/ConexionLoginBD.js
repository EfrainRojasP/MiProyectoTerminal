import mysql from "mysql";
import dotenv from "dotenv";
import {convertirRespuestaAObjeto} from "../Ayudas/Ayudas.js"

dotenv.config();

export class ConexionLoginBD{
    conexionMYSQL = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD_DB,
        database: process.env.DB_LOGIN
    });

    /**
     * Inicia la conexion con la BD Login
     * @returns True si todo salio bien
     */
    iniciarConexionMYSQL(){
        return new Promise((resolve, reject) => {
            this.conexionMYSQL.connect(function (err) {
                if (err) {
                    return reject(err.stack);
                }
                resolve();
            });
        });
    }

    /**
     * Consulta el email del usuario en la base de datos
     * @param {String} email Email del usuario 
     * @returns Email del usuario
     * @returns False si no existe el email del usuario
     */
    consultarEmailUsuario(email){
        return new Promise((resolve, reject) => {
            const stm = "SELECT emailUsuario FROM Usuario WHERE emailUsuario = ?";
            const query = this.conexionMYSQL.query(stm, email, function (error, results, fields) {
                if (error){
                    return reject(error.stack)
                }
                //Si el email no esta en la BD se envia flase
                if(results[0] === undefined){
                    return resolve(false);
                }
                const result = convertirRespuestaAObjeto(results);
                return resolve(result[0].emailUsuario);
            });
        })
    }

    /**
     * Consulta el GUID del usuario
     * @param {String} email Email del usuario
     * @returns De vulve el GUID del usuario
     * @returns False si el GUID no existe
     */
    consultarGUIDUsuario(email){
        return new Promise((resolve, reject) => {
            const stm = "SELECT guidUsuaio FROM Usuario WHERE emailUsuario = ?";
            const query = this.conexionMYSQL.query(stm, email, function (error, results, fields) {
                if (error){
                    return reject(error.stack)
                }
                //Si el GUID no esta en la BD se envia flase
                if(results[0] === undefined){
                    return resolve(false);
                }
                const result = convertirRespuestaAObjeto(results);
                return resolve(result[0].guidUsuaio);
            });
        });
    }

    /**
     * Consulta el hash de la constraseña de usuario
     * @param {String} email Email del usuario
     * @returns Devuelve el has de la contraseña del usuario
     * @returns Devuelve False si el email de usuario no existe
     */
    consultarPasswordUsuario(email){
        return new Promise((resolve, reject) => {
            const stm = "SELECT passUsuario FROM Usuario WHERE emailUsuario = ?";
            const query = this.conexionMYSQL.query(stm, email, function (error, results, fields) {
                if (error){
                    return reject(error.stack);
                }
                //Si el pass no esta en la BD se envia flase
                if(results[0] === undefined){
                    return resolve(false);
                }
                const result = convertirRespuestaAObjeto(results);
                return resolve(result[0].passUsuario);
            });
        });
    }

    /**
     * Consulta el rol del usuario
     * @param {String} email Email del usuario
     * @returns Devuelve el rol del usuario
     */
    consultarRolUsuario(email){
        return  new Promise((resolve, reject) => {
            const stm = "SELECT FK_tipoUsuario FROM Usuario WHERE emailUsuario = ?";
            const query = this.conexionMYSQL.query(stm, email, function (error, results, fields) {
                if (error){
                    throw error.stack;
                }
                const result = convertirRespuestaAObjeto(results);
                return resolve(result[0].FK_tipoUsuario)
            });
        });
    }

}

    

    
/*const conexionMYSQL = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_LOGIN
});

const inicarConexionMYSQL = () => {
    return new Promise((resolve, reject) => {
        conexionMYSQL.connect(function (err) {
            if (err) {
                reject(err.stack);
            }
            resolve(conexionMYSQL.threadId);
        });
    });
}
*/
//export {ConexionLoginBD};