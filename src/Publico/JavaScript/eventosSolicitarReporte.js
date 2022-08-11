var fechaDeEntrega = document.getElementById("fechaEntrega");
var cualSucursal = document.getElementById("seleccionSucursal");
var btnSolicitar = document.getElementById("btnSolicitar");

cualSucursal.setAttribute("required", "");
fechaDeEntrega.setAttribute("required", "");

class SolicitarReporte{
    fechaDeEntrega;
    cualSucursal;
    constructor(fechaDeEntrega, cualSucursal) {
        this.fechaDeEntrega = fechaDeEntrega;
        this.cualSucursal = cualSucursal;
    }
    objetoJSON(objeto){
        return JSON.stringify(objeto);
    }
}

function opcionesSeleccionadas(select){
    var arrOpciones = [];
    for(var option of select.options){
        if(option.selected){
            arrOpciones.push(option.text);
        }
    }
    return arrOpciones;
}

btnSolicitar.onclick = function(){
    var arrOpciones = opcionesSeleccionadas(cualSucursal);
    var mensaje;
    if(arrOpciones.length != 0 && fechaDeEntrega.length != 0){
        var solicitarReporte = new SolicitarReporte(fechaDeEntrega.value, opcionesSeleccionadas(cualSucursal));
        mensaje = "Se solicito un reporte de ventas:\n" + "Con fecha limite: " + solicitarReporte.fechaDeEntrega + "\n";
        mensaje += arrOpciones.length > 1 ? "A " + arrOpciones.length + " tiendas seleccionadas" : "A todas las sucursales";
        console.log('solicitarReporte :>> ', solicitarReporte);
        alert(mensaje);
    }
    
};

