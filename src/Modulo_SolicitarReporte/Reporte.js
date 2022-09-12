export class Reporte{
    GUIDReporte;
    fechaEntraga;
    descReporte;
    fechaSolicitud;
    
    /**
     * Metodo que devulve un arreglo con las caracteristicas del reporte
     * @returns Devulve un arrego con las caracteristicas del reporte: GUID, descripcion y fecha
     */
    getArrayReporteCaracteristicas(){
        return [this.fechaSolicitud ,this.GUIDReporte, this.descReporte, this.fechaEntraga];
    }

    /**
     * Metodo GET, recupera el GUID del report
     * @returns Devulver el GUID del reporte
     */
    getGUIDReporte(){
        return this.GUIDReporte;
    }

    /**
     * Metodo GET, recupera la fecha de entraga del reporte
     * @returns Devuelve la fecha en que se tiene que entregar el reporte
     */
    getFechaEntraga(){
        return this.fechaEntraga;
    }

    /**
     * Metodo GET, recupera la descripcion del reporte
     * @returns Devulve la descripcion del reporte
     */
    getDescReporte(){
        return this.descReporte;
    }

    /**
     * Metodo get, recupera la fecha de solicitud
     * @returns 
     */
    getFechaSolicitud(){
        return this.fechaSolicitud;
    }

    /**
     * Metodo SET, inicializa el GUID del reporte
     * @param {String} GUIDReporte GUID del reporte
     */
    setGUIDReporte(GUIDReporte){
        this.GUIDReporte = GUIDReporte;
    }

    /**
     * Metodo SET, inicializa la fecha de entrega del reporte
     * @param {Date} fechaDeEntrega 
     */
    setFechaEntraga(fechaDeEntrega){
        this.fechaEntraga = fechaDeEntrega;
    }

    /**
     * Metodo SET, inicaliza la descripcion del reporte
     * @param {String} descReporte Descripcion de reporte
     */
    setDescReporte(descReporte){
        this.descReporte = descReporte;
    }

    /**
     * Metodo SET, inicaliza la fecha en que se creo la solicitud para el reporte
     * @param {Date} fechaSolicitud Fecha de creacion del reporte
     */
    setFechaSolicitud(fechaSolicitud){
        this.fechaSolicitud = fechaSolicitud;
    }

}