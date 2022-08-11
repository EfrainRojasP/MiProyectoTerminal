/*Creamos una clase para la consulta de parametros, esto luego lo pasaremos como JSON*/
class ConsultaParametros{
    porPeriodo;
    porTienda;
    porMunAlca;
    porEntidad;
    porProducto;
    porTipoProd;
    porProdMas;
    porPordMenos;
}

//Apuntador a la calse
var consultar = new ConsultaParametros();

var tipoConsulta = document.getElementById("tipoDeconsulta");

//Consultas por periodo
var consulPorPeriodo = document.getElementById("consulPorPeriodo");
var periodoDesde = document.getElementById("periodoDesde");
var periodoHasta = document.getElementById("periodoHasta");

//Consultas por tienda
var consulPorTienda = document.getElementById("consulPorTienda");
var cualTienda = document.getElementById("cualTienda");
//Consultar por municipio o alcadia
var consulPorMun = document.getElementById("consulPorMunAlcadia");
var cualMun = document.getElementById("cualMunicipioAlca");
//Consultar por entidad
var consulPorEnti = document.getElementById("consulPorEntidad");
var cualEntidad = document.getElementById("cualEntidad");

//Consultar por periodo de tiempo
var consulPorProducto = document.getElementById("consulPorProducto");
var cualProducto = document.getElementById("cualProducto");
//Consultar por tipo de producto
var consulPorTipoProd = document.getElementById("consulPorTipoProducto");
var cualTipoProducto = document.getElementById("cualTipoProd");
//Consultar por producto mas vendido
var consulPorProdMasVend = document.getElementById("consulPorPruductoMasVendido");
//Consultar por producto menos vandido
var consulPorPordMenosVend = document.getElementById("consulPorPruductoMenosVendido"); 

var btnConsultar = document.getElementById("hacerConsulta");
var btnCancelar = document.getElementById("cancelarConsulta")

//Arreglo con el cual desactivamos elemento
var arrDesactivarElemento = [periodoDesde, periodoHasta, cualTienda, consulPorMun, cualMun, consulPorEnti, cualEntidad, cualProducto, consulPorTipoProd, cualTipoProducto, consulPorProdMasVend, consulPorPordMenosVend, btnCancelar, btnConsultar];
//Desactivamos los siguientes elementos
for(var elemento of arrDesactivarElemento){
    elemento.disabled = true;
}


var arrElementosTienda = [cualTienda, consulPorMun, consulPorEnti, cualMun, cualEntidad];
var arrElementosProducto = [cualProducto, consulPorTipoProd, consulPorProdMasVend, consulPorPordMenosVend, cualTipoProducto];
var arrCheckboxTienda = [cualTienda, consulPorMun, consulPorEnti];
var arrCheckboxProducto = [cualProducto, consulPorTipoProd, consulPorProdMasVend, consulPorPordMenosVend];
var arrCalendario = [periodoDesde, periodoHasta];
/*
Funcion para activar/desactivar los chexboxes o calendarios
1->Activar
2->Desactivar
*/
function activarDesctivarCheckboxesCalendarios(array, bandera){
    if(bandera == 1){
        //Activar
        array[0].setAttribute("required", "");
        for(var elemnto of array){
            elemnto.disabled = false;
        }
    } else {
        //Desactivar
        for(var elemnto of array){
            elemnto.disabled = true;
        }
    }
}

//Desactivamos los elementos de una consulta
function desactivarElementos(array){
    for(var elemnto of array){
        elemnto.disabled = true;
    }
}

/*
Funcion para desctivar las listas
checkbox -> Indica si hay que activar o desactivar
lista -> Es la lista que activaremos o desactivaremos
*/
function activarDesactivarListas(checkbox, lista){
    if(checkbox.checked === true){
        lista.disabled = false;
        lista.setAttribute("required", "");
    } else {
        lista.disabled = true;
    }
}

//Funcion para activar o desctivar el boton de consultar y cancelar.
//Solo se activan los botones cuando las alguna de las casillas de periodo, tienda o producto son activadas
function activarDesactivarConsulta(){
    var prender;
    if(consulPorPeriodo.checked === false && consulPorTienda.checked === false && consulPorProducto.checked === false){
        btnConsultar.disabled = true;
        btnCancelar.disabled = true;
    } else {
        btnConsultar.disabled = false;
        btnCancelar.disabled = false;
    }
}

//Nos muestra las opciones que el usuario escogio
//retun -> Un arreglo de las opciones seleccionadas
function opcionesSeleccionadas(select){
    var arrOpciones = [];
    //console.log(select.options);
    for(var option of select.options){
        if(option.selected){
            arrOpciones.push(option.text);
        }
    }
    return arrOpciones;
}

/*
Llena las propiedades de la clase ConsultaParametros
elementoLista:
    0 -> No pasaremos un elemento de tipo selected
    elementoLista -> Pasamos un elemento de tipo selected

elemento:
    0 -> No pasaremos un elemento de tipo chekbox
    elemento -> Pasamos un elemento de tipo checkbox
*/
function llenarConsultarParametros(elementoLista, elemento){
    if(elemento == 0){
        if(elementoLista.id == "cualTienda"){
            consultar.porTienda = [];
            consultar.porTienda = opcionesSeleccionadas(elementoLista);
        } else if (elementoLista.id == "cualMunicipioAlca"){
            consultar.porMunAlca = [];
            consultar.porMunAlca = opcionesSeleccionadas(elementoLista);
        } else if (elementoLista.id == "cualEntidad"){
            consultar.porEntidad = [];
            consultar.porEntidad = opcionesSeleccionadas(elementoLista);
        } else if (elementoLista.id == "cualProducto"){
            consultar.porProducto = [];
            consultar.porProducto = opcionesSeleccionadas(elementoLista);
        } else if (elementoLista.id == "cualTipoProd"){
            consultar.porTipoProd = [];
            consultar.porTipoProd = opcionesSeleccionadas(elementoLista);
        } 
    }

    if(elementoLista == 0){
        if(elemento.id == "consulPorPruductoMasVendido"){
            consultar.porProdMas = true;
        } else if (elemento.id == "consulPorPruductoMenosVendido"){
            consultar.porPordMenos = true;
        }
    } 
}

/*
Funcion que verfica si los campos requeridos son correctos y si son correctos añade su valor a la clase
Elemento -> El elemento html
Elmento lista -> Indica si el elemento es una lista seleccionable o un checkbox
Tipo elemento:
0 -> Elemento calenadario
1 -> Elemento checkbox
2 -> Pasaremos dos checkboxes
*/
function verificarConsulta(elemento, elementoLista, tipoElemento){
    //console.log("Entrado con " + elemento.id + " " + elementoLista.id);
    if(tipoElemento == 0){
        if(elemento.value.length == 0){
            alert("Seleccione una fecha");
            return 0;
        }
    } else if (tipoElemento == 1) {
        if(elemento.checked === true){
            if(elementoLista.value.length === 0){
                alert("Seleccione un elemento de la lista");
                return 0;
            } else {
                llenarConsultarParametros(elementoLista, 0);
            }
        }
    } else if (tipoElemento == 2){
        if(elemento.checked === true && elementoLista.checked === true){
            alert ("Solo pude escoger: Productos mas vendidos o Productos menos vendidos" + "\n" + "No ambos")
            elemento.checked = false;
            elementoLista.checked = false;
        }
        if(elemento.checked === true && elementoLista.checked === false){
            llenarConsultarParametros(0, elemento);
        } else if (elemento.checked === false && elementoLista.checked === true){
            llenarConsultarParametros(0, elementoLista);
        }
    }
}

//Evento para el checkbox del periodo
consulPorPeriodo.onchange = function(){
    if(consulPorPeriodo.checked === true){
        //Activamos los calendarios de la seccion del periodo
        activarDesctivarCheckboxesCalendarios(arrCalendario, 1);
        arrCalendario[1].setAttribute("required", "");
        activarDesactivarConsulta();
        añadirDescripcionConsulta("porPeriodo");
    } else {
        //Desactivamos los calendarios de la seccion del periodo
        activarDesctivarCheckboxesCalendarios(arrCalendario, 0);
        activarDesactivarConsulta();
        quitarDescripcionConsulta("porPeriodo")
    }
};


//Evento para el chexkbox de la tienda
consulPorTienda.onchange = function(){
    if(consulPorTienda.checked === true){
        //Activamos los checkboxes de la seccion de la tienda
        activarDesctivarCheckboxesCalendarios(arrCheckboxTienda, 1);
        activarDesactivarConsulta();
        añadirDescripcionConsulta("porTienda");
    } else {
        //Desactivamos toda la seccion de la tienda
        desactivarElementos(arrElementosTienda);
        activarDesactivarConsulta();
        quitarDescripcionConsulta("porTienda");
    }
}

//Evento para el checkbox de la para la consulta por entidad
consulPorEnti.onchange = function(){
    activarDesactivarListas(consulPorEnti, cualEntidad);
    if(consulPorEnti.checked === true){
        añadirDescripcionConsulta("porEntidad");
    } else {
        quitarDescripcionConsulta("porEntidad");
    }
}

//Evento para el checkbox de la para la consulta por municipio/alcaldia
consulPorMun.onchange = function(){
    activarDesactivarListas(consulPorMun, cualMun);
    if(consulPorMun.checked === true){
        añadirDescripcionConsulta("porMunAlca");
    } else {
        quitarDescripcionConsulta("porMunAlca");
    }
}

//Evento para el checkbox del producto
consulPorProducto.onchange = function(){
    if(consulPorProducto.checked === true){
        activarDesctivarCheckboxesCalendarios(arrCheckboxProducto, 1);
        activarDesactivarConsulta();
        añadirDescripcionConsulta("porProducto");
    } else {
        activarDesactivarConsulta();
        desactivarElementos(arrElementosProducto);
        quitarDescripcionConsulta("porProducto");
    }
}

//Evento para el checkbox de la consulta por tipo de pruducto
consulPorTipoProd.onchange = function(){
    activarDesactivarListas(consulPorTipoProd, cualTipoProducto);
    if(consulPorTipoProd.checked === true){
        añadirDescripcionConsulta("porTipoProducto");
    } else {
        quitarDescripcionConsulta("porTipoProducto");
    }
};


consulPorPordMenosVend.onchange = function(){
    if (consulPorProdMasVend.checked === true){
        alert("Ya esta consultando por producto mas venedio, solo se puede escoger una opcion");
        consulPorPordMenosVend.checked = false;
    }
    if(consulPorPordMenosVend.checked === true){
        añadirDescripcionConsulta("porProductoMenos");
    } else {
        quitarDescripcionConsulta("porProductoMenos");
    }
    
}

consulPorProdMasVend.onchange = function(){
    if (consulPorPordMenosVend.checked === true){
        alert("Ya esta consultando por producto menos venedio, solo se puede escoger una opcion");
        consulPorProdMasVend.checked = false;
    }
    if(consulPorProdMasVend.checked === true){
        añadirDescripcionConsulta("porProducoMas");
    } else {
        quitarDescripcionConsulta("porProducoMas");
    }
}

btnConsultar.onclick = function(){
    //console.log(opcionesSeleccionadas(cualEntidad));
    if(consulPorPeriodo.checked === true){
        if(verificarConsulta(periodoDesde, 0, 0) == 0 || verificarConsulta(periodoHasta, 0, 0) == 0){
            return 0;
        } else {
            consultar.porPeriodo = [];
            consultar.porPeriodo.push(periodoDesde.value);
            consultar.porPeriodo.push(periodoHasta.value);
        }
    }
    if(consulPorTienda.checked === true){
        if(verificarConsulta(consulPorTienda, cualTienda, 1) == 0){
            return 0;
        }
        if(verificarConsulta(consulPorMun, cualMun, 1) == 0){
            return 0;
        }
        if(verificarConsulta(consulPorEnti, cualEntidad, 1) == 0){
            return 0;
        }
    }
    if(consulPorProducto.checked === true){
        if(verificarConsulta(consulPorProducto, cualProducto, 1) == 0){ 
            return 0;
        } 
        if (verificarConsulta(consulPorTipoProd, cualTipoProducto, 1) == 0){
            return 0;
        }
        if(verificarConsulta(consulPorProdMasVend, consulPorPordMenosVend, 2) == 0){
            return 0;
        }
    }
}

//Añade un parrafo para los elementos que podemos selecionar
function añadirDescripcionConsultaSelect(contenidoConsulta, idContenido, span, idSpan, txtContend, bandera){
    if (bandera == 1){
        contenidoConsulta.id = idContenido;
        span.id = idSpan;
        contenidoConsulta.textContent = txtContend;
        tipoConsulta.appendChild(contenidoConsulta);    
        contenidoConsulta.appendChild(span);
    } else if(bandera == 2){
        contenidoConsulta.id = id;
        contenidoConsulta.textContent = txtContend;
        tipoConsulta.appendChild(contenidoConsulta);
    }
}

//Escribimos el tipo de consulta en un parrafo
function añadirDescripcionConsulta(id){
    var contenidoConsulta = document.createElement("p");
    var newSpan1 = document.createElement("span");
    var newSpan2 = document.createElement("span");
    if(id == "porPeriodo"){
        contenidoConsulta.id = id;
        newSpan1.id = "fechaDesde"
        newSpan2.id = "fechaHasta"
        contenidoConsulta.textContent = "Periodo de tiempo: ";
        newSpan1.textContent = periodoDesde.value;
        newSpan2.textContent = " - " + periodoHasta.value;
        tipoConsulta.appendChild(contenidoConsulta);
        contenidoConsulta.appendChild(newSpan1);
        contenidoConsulta.appendChild(newSpan2);
    } else if (id == "porTienda"){
        añadirDescripcionConsultaSelect(contenidoConsulta, id, newSpan1, "cuantasTiendas", "Tienda(s): ", 1);
                                        //idSpan          selected      El texto cuando se seleeciona mas de un elemento
        añadirLosElementosSeleccionados("cuantasTiendas", cualTienda, " tiendas seleccionadas");
    } else if (id == "porMunAlca"){
        añadirDescripcionConsultaSelect(contenidoConsulta, id, newSpan1, "cuantosMunAlca", "Municipio(s)/Alcaldia(s): ", 1);
        añadirLosElementosSeleccionados("cuantosMunAlca", cualMun, " Municipios/Alcaldias seleccionados");
    } else if (id == "porEntidad"){
        añadirDescripcionConsultaSelect(contenidoConsulta, id, newSpan1, "cuantasEntidades", "Entidad(es): ", 1);
        añadirLosElementosSeleccionados("cuantasEntidades", cualEntidad, " Entidades seleccionadas");
    } else if (id == "porProducto"){
        añadirDescripcionConsultaSelect(contenidoConsulta, id, newSpan1, "cuantosProductos", "Producto(s): ", 1);
        añadirLosElementosSeleccionados("cuantosProductos", cualProducto, " Productos seleccionados");
    } else if (id == "porTipoProducto"){
        añadirDescripcionConsultaSelect(contenidoConsulta, id, newSpan1, "cuantosTipoProd", "Tipo(s) de producto(s): ", 1);
        añadirLosElementosSeleccionados("cuantosTipoProd", cualTipoProducto, " Tipos de productos seleccionados");
    } else if (id == "porProducoMas"){
        contenidoConsulta.id = id;
        contenidoConsulta.textContent = "Producto mas vendido";
        tipoConsulta.appendChild(contenidoConsulta);
    } else if (id == "porProductoMenos"){
        contenidoConsulta.id = id;
        contenidoConsulta.textContent = "Producto menos vendido";
        tipoConsulta.appendChild(contenidoConsulta);
    }
}

function quitarDescripcionConsulta(id){
    tipoConsulta.removeChild(document.getElementById(id));
}

periodoDesde.onchange = function(){
    var fechaDesde = document.getElementById("fechaDesde");
    fechaDesde.textContent = periodoDesde.value;
    //fechaDesde.appendChild(fechaDesde);
}

periodoHasta.onchange = function(){
    var fechaHasta = document.getElementById("fechaHasta");
    fechaHasta.textContent = " - " + periodoHasta.value;
    //fechaHasta.appendChild(fechaDesde);
}

cualTienda.onchange = function(){
    añadirLosElementosSeleccionados("cuantasTiendas", cualTienda, " tiendas seleccionadas");
}

cualMun.onchange = function(){
    añadirLosElementosSeleccionados("cuantosMunAlca", cualMun, " Municipios/Alcaldias seleccionados");
}

cualEntidad.onchange = function(){
    añadirLosElementosSeleccionados("cuantasEntidades", cualEntidad, " Entidades seleccionadas");
}

cualProducto.onchange = function (){
    añadirLosElementosSeleccionados("cuantosProductos", cualProducto, " Productos seleccionados");
}

cualTipoProducto.onchange = function (){
    añadirLosElementosSeleccionados("cuantosTipoProd", cualTipoProducto, " Tipos de productos seleccionados");
}

/*
Añade los elementos selecciondos de una lista o de un selected
id -> id Del span
select -> Es la lista o el elemento select que desamos saber cuantos elemetos selecciono el usario
texto -> Es el texto que aparecera en el span
*/
function añadirLosElementosSeleccionados(id, select, texto){
    var span = document.getElementById(id);
    var arrElementosSelecionados = opcionesSeleccionadas(select);
    if(arrElementosSelecionados.length > 1){
        span.textContent = select.length + texto
    } else if(arrElementosSelecionados.length == 1) {
        span.textContent = arrElementosSelecionados[0];
    } else if (arrElementosSelecionados.length == 0){
        span.textContent = "";
    }
}

