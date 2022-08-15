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

    consultarGUIDUsuario(email){
        return new Promise((resolve, reject) => {
            const stm = "SELECT guidUsuaio FROM Usuario WHERE emailUsuario = ?";
            const query = this.conexionMYSQL.query(stm, email, function (error, results, fields) {
                if (error){
                    return reject(error.stack)
                }
                const result = convertirRespuestaAObjeto(results);
                return resolve(result[0].guidUsuaio);
            });
        });
    }

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