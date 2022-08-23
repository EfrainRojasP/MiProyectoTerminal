export function convertirRespuestaAObjeto(result) {
    return Object.values(JSON.parse(JSON.stringify(result)));
}

/**
 * 
 * @param {token} authorization 
 * @returns Devulve el token
 */
export function extraerToken(authorization) {
    return authorization.substring(7);
}

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

export function consultaFecha(arrayParametros, consulta, columna, arrayFechas) {
    arrayParametros.push(columna);
    arrayParametros.push(arrayFechas);
    let parametro = consulta + " AND " + "?" + " BETEEWN " + "? AND ?";
    return parametro; 
}

export function consultaPorCantidad(arrayParametros, consulta, columna, masOMenoVendido) {
    arrayParametros.push(columna);
    return masOMenoVendido === "porProdMas" ? 
        consulta + " ORDER BY ? DESC" : consulta + " ORDER BY ? ASC";
}

export function consulta(arrayParametros, consulta, columna, arrayID) {
    if(!arrayID.includes("0")){
        arrayParametros.push(columna);
        arrayParametros.push(arrayID.map(e => {
            return parseInt(e, 10);
        }));
        return consulta + " AND " + " ? " + "IN" + " (?) " ;
    }
    return consulta;
}
