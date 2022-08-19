import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export class ConexionVentasDB {
    conexionMYSQL = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD_DB,
        database: process.env.DB_VENTAS
    });

    /**
     * 
     * @returns 
     * Devuelve true si la conexion fue un exito
     * Devuelve un error si la conexion fallo
     */
    iniciarConexionMYSQL() {
        console.log("CONEXION " + this.conexionMYSQL);
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
     * 
     * @returns 
     * Devuelve la referencia a la conexion de la Base de datos de Ventas
     */
    getConexion(){
        return this.conexionMYSQL;
    }
}