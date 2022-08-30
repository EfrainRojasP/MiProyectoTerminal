const fechaDeEntrega = document.getElementById("fechaEntrega");
const btnSolicitar = document.getElementById("btnSolicitar");
const descRpot = document.getElementById("descripcionRpo");

descRpot.getAttribute("required", "");
fechaDeEntrega.setAttribute("required", "");



class SolicitarReporte{
    fechaDeEntrega;
    descripcion;
    constructor(fechaDeEntrega, descripcion) {
        this.fechaDeEntrega = fechaDeEntrega;
        this.descripcion = descripcion;
    }
    objetoJSON(objeto){
        return JSON.stringify(objeto);
    }
}


/*btnSolicitar.onclick = function(){
    var arrOpciones = opcionesSeleccionadas(cualSucursal);
    var mensaje;
    if(arrOpciones.length != 0 && fechaDeEntrega.length != 0){
        var solicitarReporte = new SolicitarReporte(fechaDeEntrega.value, opcionesSeleccionadas(cualSucursal));
        mensaje = "Se solicito un reporte de ventas:\n" + "Con fecha limite: " + solicitarReporte.fechaDeEntrega + "\n";
        mensaje += arrOpciones.length > 1 ? "A " + arrOpciones.length + " tiendas seleccionadas" : "A todas las sucursales";
        console.log('solicitarReporte :>> ', solicitarReporte);
        alert(mensaje);
    }
    
};*/

