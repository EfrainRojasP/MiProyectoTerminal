import { nanoid } from "nanoid";

/**
 * Convierte la respuesta a un objeto, es decir; quita el RowPackage
 * @param {result} result Resultado de la base de datos
 * @returns Devuelve un objeto para que se a enviado
 */
export function convertirRespuestaAObjeto(result) {
    return Object.values(JSON.parse(JSON.stringify(result)));
}

/**
 * Extre el token de la cabecera authorization
 * @param {authorization} authorization Cabecera authorization
 * @returns Devulve el token
 */
export function extraerToken(authorization) {
    return authorization.substring(7);
}

/**
 * Crea y devulve un HashMap con los nombre de las columnas de la vista "Ventas_Consultas",
 * las cuales se van a consultar.
 * @returns Devulve un HashMap con los nombres de la columna de la vista "Ventas_Consultas"
 */
export function crearHasMap() {
    let hashMap = new Map();
    hashMap.set("porPeriodo", "fechaVenta");
    hashMap.set("porTienda", "idSucursal");
    hashMap.set("porMunAlca", "FK_IDMUNICIPIO_ALCALDIA");
    hashMap.set("porEntidad", "FK_idEntidad");
    hashMap.set("porProducto", "idProducto");
    hashMap.set("porTipoProd", "fk_idtipoProducto");
    hashMap.set("porProdMas", "cantidadVenta");
    hashMap.set("porPordMenos", "cantidadVenta");
    return hashMap;
}

/**
 * Construye la consulta a la base de datos, para buscar las ventas en un periodo de tiempo
 * @param {Array} arrayParametros Parametros de la consulta personalizada
 * @param {String} consulta La consulta a la Base de datos
 * @param {String} columna El nombre de columna de la vista "Ventas_Consultas"
 * @param {Array} arrayFechas Arreglo con la fecha de inicio y de fin
 * @returns Devulve una consulta para buscar la fecha
 */
export function consultaFecha(arrayParametros, consulta, columna, arrayFechas) {
    //arrayParametros.push(columna);
    arrayParametros.push(arrayFechas[0]);
    arrayParametros.push(arrayFechas[1]);
    let parametro = consulta + " AND " + columna + " BETWEEN " + "? AND ?";
    return parametro; 
}

/**
 * Construye la consulta a la base de datos, para buscar el producto mas o menos vendido
 * @param {Array} arrayParametros Parametros de la consulta personalizada
 * @param {String} consulta La consulta a la Base de datos
 * @param {String} columna El nombre de columna de la vista "Ventas_Consultas"
 * @param {boolean} masOMenoVendido Consulta por el mas o menos vendido
 * @returns Devuelve una consulta para buscar por el producto mas o menos vendido
 */
export function consultaPorCantidad(arrayParametros, consulta, columna, masOMenoVendido) {
    //arrayParametros.push(columna);
    return masOMenoVendido === "porProdMas" ? 
        consulta + " ORDER BY " + columna + " DESC" : consulta + " ORDER BY " + columna + " ASC";
}

/**
 * Construye la consulta a la base de datos, para buscar en las ventas
 * @param {Array} arrayParametros Parametros de la consulta personalizada
 * @param {String} consulta La consulta a la Base de datos
 * @param {String} columna El nombre de columna de la vista "Ventas_Consultas"
 * @param {Array} arrayID El id de los elementos que se van a consultar
 * @returns Devuelve una consulta para buscar las ventas, dependido el arrayID
 */
export function consulta(arrayParametros, consulta, columna, arrayID) {
    if(!arrayID.includes("0")){
        //arrayParametros.push(columna);
        arrayParametros.push(arrayID.map(e => {
            return parseInt(e, 10);
        }));
        return consulta + " AND " + columna + " IN " + " (?) " ;
    }
    return consulta;
}

/**
 * Refactoriza la fecha de formato UTC a formato YYYY-MM-DD
 * @param {result} result El resultado de la consulta a la base de datos
 * @param {int} bandera El tipo de refactorizacion que haremos
 * @returns Devulve la fecha refactorizada en formato YYYY-MM-DD
 */
export function refectorizarFecha(result, bandera) {
    if(bandera === 1){
        for(let i = 0; i < result.length; ++i){
            const fecha = result[i]["fechaVenta"];
            result[i]["fechaVenta"] = fecha.substring(0, 10);
            
        }
    } else if(bandera === 2){
        for(let i = 0; i < result.length; ++i){
            const fechaSolicitud = result[i]["fechaSolicitud"];
            const fechaLimite = result[i]["fechaLimite"];
            result[i]["fechaSolicitud"] = fechaSolicitud.substring(0, 10);
            result[i]["fechaLimite"] = fechaLimite.substring(0, 10);
        }
    }
    return result;
}



/**
 * Crea un conjunto da values alfanumericos
 * @param {int} tamGUID Tamaño de la cadena 
 * @returns Devulve un conjunto de valures alfanumericos, dependiendo del tamaño de la cadena
 */
export function crearGUID(tamGUID) {
    return nanoid(tamGUID);
}

/**
 * Crea la fecha del dia de hoy en el formato YYYY-MM-DD
 * @returns Devulve la fecha en formato YYYY-MM-DD
 */
export function fechaAlDia(){
    const date = new Date();
    const dia = ("0" + date.getDate()).slice(-2);
    const mes =  ("0" + (date.getMonth() + 1)).slice(-2);
    const anio = date.getFullYear();
    return anio + "-" + mes + "-" + dia;
}