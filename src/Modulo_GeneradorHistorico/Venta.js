export class Venta{
    fechaVenta;
    cantidadVenta;
    idSucursal;
    idProducto;

    /**
     * Constructor
     * @param {String} fecha Fecha en que se realizo la venta
     * @param {Number} cantidad Cantidad de producto
     * @param {Number} idSuc Id de la sucursal del encaegado
     * @param {Number} idProd Id del producto
     */
    constructor(fecha, cantidad, idSuc, idProd) {
        this.fechaVenta = fecha;
        this.cantidadVenta = cantidad;
        this.idSucursal = idSuc;
        this.idProducto = idProd;
    }

    /**
     * Devulve un arreglo con la informacion de la venta
     * @returns Devulve un arreglo con la informacion de la venta
     */
    arrInfoVentas(){
        return [this.fechaVenta, this.cantidadVenta, this.idSucursal, this.idProducto];
    }

    /**
     * Metodo GET, repcupera la fecha dela venta
     * @returns Devuelve la fecha de la venta
     */
    getFechaVenta(){
        return this.fechaVenta;
    }

    /**
     * Metodo GET, repcupera la cantidad de la venta
     * @returns Devuelve la cantidad de la venta
     */
    getCantidadVenta(){
        return this.cantidadVenta;
    }

    /**
     * Metodo GET, repcupera el id de la sucursal
     * @returns Devuelde el id de la sucursal
     */
    getIdSucursal(){
        return this.idSucursal;
    }

    /**
     * Metodo GET, repcupera el id del producto
     * @returns Devuelve el id del producto
     */
    getIdProducto(){
        return this.idProducto;
    }

    /**
     * Metodo SET, inicializa la fecha de la venta
     * @param {String} fechaVenta 
     */
    setFechaVenta(fechaVenta){
        this.fechaVenta = fechaVenta;
    }

    /**
     * Metodo SET, inicializa la cantidad de la venta
     * @param {Number} cantidadVenta Cantidad de la venta
     */
    setCantidadVenta(cantidadVenta){
        this.cantidadVenta = cantidadVenta;
    }

    /**
     * Metodo SET, inicializa el id de la sucursal
     * @param {Number} idSucursal Id sucursal
     */
    setIdSucursal(idSucursal){
        this.idSucursal = idSucursal;
    }

    /**
     * Metodo SET, inicializa el id del producto
     * @param {Number} idProducto Id del producto
     */
    setIdProducto(idProducto){
        this.idProducto = idProducto;
    }
    
    /**
     * Metodo toString
     * @returns Infomracion de la clase
     */
    toString(){
        return "Venta { FechaVenta: " + this.getFechaVenta()+ " CantidadVenta: " + this.getCantidadVenta() 
        + " idSucursal: " + this.getIdSucursal() + " idProducto: " + this.getIdProducto() + "}";
    }

}