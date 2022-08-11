export function convertirRespuestaAObjeto(result){
    return Object.values(JSON.parse(JSON.stringify(result)));
}