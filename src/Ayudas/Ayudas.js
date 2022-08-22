export function convertirRespuestaAObjeto(result){
    return Object.values(JSON.parse(JSON.stringify(result)));
}

/**
 * 
 * @param {token} authorization 
 * @returns Devulve el token
 */
export function extraerToken(authorization){
    return authorization.substring(7);
}