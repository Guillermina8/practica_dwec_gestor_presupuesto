import * as gestorPresu from './gestionPresupuesto.js';

const Url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'; 

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb); //*Repetido, lo tengo en Estaticos.

let botonCargarGasto = new cargarGastosWeb();
document.getElementById("cargar-gastos").addEventListener("click", botonCargarGasto);
let btnAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);
let botonFiltradoFormGasto = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", botonFiltradoFormGasto);
let botonGuardarGasto = new guardarGastosWeb();
document.getElementById("guardar-gastos").addEventListener("click", botonGuardarGasto);
let btnCargarGastosAPI = document.getElementById("cargar-gastos-api");
btnCargarGastosAPI.addEventListener("click", cargarGastosApi);//! GUILLE: Me quedo en Modificación  .gasto-enviar-apio la estructura HTML en el punto  dentro de nuevoGastoWebFormulario

//

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    // Obtén el elemento objetivo
    let elementoObj = document.getElementById(idElemento);
    if (elementoObj){
    // Crea los elementos div
    let divGasto = document.createElement('div');
    let divGasDesc = document.createElement('div');
    let divGasFecha = document.createElement('div');
    let divGasValor = document.createElement('div');
    let divGasEtiquetas = document.createElement('div');
    // Asigna las clases
    divGasto.className = "gasto";
    divGasDesc.className = "gasto-descripcion";
    divGasFecha.className = "gasto-fecha";
    divGasValor.className = "gasto-valor";
    divGasEtiquetas.className = "gasto-etiquetas";
    // Asigna los valores
    divGasDesc.innerText = gasto.descripcion;
    divGasValor.innerText = gasto.valor;
    // Formatea la fecha (si gasto.fecha es un objeto Date)
    let fechaFormateada = new Date(gasto.fecha).toLocaleDateString()
    //let fechaFormateada = gasto.fecha;
    divGasFecha.innerText = fechaFormateada;
    // Agrega etiquetas
    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.append(`${etiqueta},`)

        spanEtiqueta.addEventListener('click', function () { 
            BorrarEtiquetasHandle(gasto, etiqueta);        
        });
        divGasEtiquetas.append(spanEtiqueta);
    }
    // Agrega los elementos al divGasto
    divGasto.append(divGasDesc);
    divGasto.append(divGasFecha);
    divGasto.append(divGasValor);
    divGasto.append(divGasEtiquetas);
    // Agrega el divGasto al elemento objetivo
    elementoObj.append(divGasto);
    //Botón Editar
    let btnEditar = document.createElement('button');
    btnEditar.className='gasto-editar';
    btnEditar.innerTextent = 'Editar';
    btnEditar.addEventListener('click', new EditarHandle(gasto) );
    divGasto.append(btnEditar) ;  
    elementoObj.append(divGasto);
    //Botón Borrar
    let btnBorrar = document.createElement('button');
    btnBorrar.className ='gasto-borrar';
    btnBorrar.innerText = 'Borrar';
    btnBorrar.addEventListener('click' , new BorrarHandle(gasto)); 
    divGasto.append(btnBorrar);
    elementoObj.append(divGasto);
    //Botón editar formulario
    let btnEditarForm = document.createElement('button');
    btnEditarForm.className = "gasto-editar-formulario";
    btnEditarForm.innerText = "Editar formulario";
    btnEditarForm.addEventListener('click', new EditarHandleFormulario(gasto, divGasto));
    divGasto.append(btnEditarForm);
        elementoObj.append(divGasto);
    //botón borrar gastos de API
        let btnBorrarApi = document.createElement('button');
        btnBorrarApi.className = "gasto-borrar-api";
        btnBorrarApi.innerHTML = "Borrar (API)";
        btnBorrarApi.type = "button";
        btnBorrarApi.addEventListener('click', new BorrarApiHandle(gasto))
        divGasto.append(btnBorrarApi);
        elementoObj.append(divGasto);

        //botón enviar API
        let btnEnviarAPI = document.createElement("button"); 
        btnEnviarAPI.className = "gasto-enviar-api";
        btnEnviarAPI.type = "button";
        btnEnviarAPI.innerHTML = "Enviar (API)";
        let enviarAPI = new EnviarApiHandle();
        btnEnviarAPI.addEventListener('click', enviarAPI);///
        divGasto.append(btnEnviarAPI);
        elementoObj.append(divGasto);
    }
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtén el elemento objetivo
    let elementoObjetivo = document.getElementById(idElemento);

    // Creo elemento div para la agrupación
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";

    // Creo elemento h1 para mostrar el periodo
    let periodo1 = "mes";
    if (periodo == "dia") {
        periodo1 = "día";
    } else if (periodo == "anyo") {
        periodo1 = "año";
    }

    let h1Periodo = document.createElement("h1");
    h1Periodo.innerText = `Gastos agrupados por ${periodo1}`;
    divAgrupacion.append(h1Periodo);

    // Itera sobre las propiedades del objeto agrup
    for (let clave in agrup) {
        if (Object.prototype.hasOwnProperty.call(agrup, clave)) {
            // Crea el elemento div para cada propiedad
            let divAgrupacionDato = document.createElement("div");
            divAgrupacionDato.className = "agrupacion-dato";

            // Crea el elemento span para la clave (nombre de la propiedad)
            let spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.innerText = clave;

            // Crea el elemento span para el valor (cantidad)
            let spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.innerText = agrup[clave];

            // Agrega los elementos al divAgrupacionDato
            divAgrupacionDato.append(spanClave);
            divAgrupacionDato.append(spanValor);

            // Agrega el divAgrupacionDato al divAgrupacion
            divAgrupacion.append(divAgrupacionDato);
        }
    }
    // Agrega el divAgrupacion al elemento objetivo
        elementoObjetivo.append(divAgrupacion);
}

function repintar() { 
    let mostrarPresupuesto = gestorPresu.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", mostrarPresupuesto);
    let totalGasto = gestorPresu.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", totalGasto);
    let blanceTotal = gestorPresu.calcularBalance();
    mostrarDatoEnId("balance-total", blanceTotal);
    let divlistado = document.getElementById("listado-gastos-completo");
    divlistado.innerHTML = " ";
    let listarGasto = gestorPresu.listarGastos();

    for (let gasto of listarGasto) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let presuWeb = prompt('Actualiza el presupuesto: '); 

    presuWeb = parseFloat(presuWeb); 
    gestorPresu.actualizarPresupuesto(presuWeb); 
    repintar(); 
}

function nuevoGastoWeb() { 
    //Pedir al usuario la información necesaria para crear un nuevo gasto
    let descripcion = prompt('Introduce la descripción del gasto: ');
    let valorStr = prompt('Introduce la cantidad: ');
    let fecha = prompt('Introduce una fecha en formato año-mes-día (yyyy-mm-dd, 2024-1-05):  ');
    let etiqueta = prompt('Introduce las etiquetas separadas por comas: comida, casa ');
    let arrayEtiquetas = etiqueta.split(', ');
    valorStr = parseFloat(valorStr);

    let nuevoGasto = new gestorPresu.CrearGasto(descripcion, valorStr, fecha, arrayEtiquetas);
    gestorPresu.anyadirGasto(nuevoGasto);

    repintar();
}

function EditarHandle(gasto) {
    this.gasto = gasto;
    this.handleEvent = function (event) {
    let nuevaDescripcion = prompt("Introduce la descripción del gasto", this.gasto.descripcion);
    let valorNuevo = prompt("Introduce el valor del gasto", this.gasto.valor);
    let nuevaFecha = prompt("Introduce la fecha del gasto en formato yyyy-mm-dd", new Date(this.gasto.fecha).toISOString().slice(0, 10));
    let strEtiquetas = prompt("Introduce las etiquetas separadas por comas (,)", this.gasto.etiquetas.join(", "));

     valorNuevo = parseFloat(valorNuevo);
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(valorNuevo);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.etiquetas = strEtiquetas.split(',').map(etiqueta => etiqueta.trim());

     repintar();
    }
}

function BorrarHandle(gasto) {
    this.gasto = gasto;
    this.handleEvent = function (event) {

     gestorPresu.borrarGasto(this.gasto.id);
     repintar();
    }
} 
 
function BorrarEtiquetasHandle(gasto, etiqueta) {
    if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
            let etiqResultado = gasto.etiquetas.indexOf(etiqueta);    
        if (etiqResultado !== -1) {
            gasto.etiquetas.splice(etiqResultado, 1);
     
                 repintar();
             }
        }
}

function nuevoGastoWebFormulario() { 
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    //Manejador de evento para el evento submit del formulario.
    formulario.addEventListener("submit", manejadoraEventoFormulario);

    let btnCancelar = formulario.querySelector("button.cancelar");
    let btnAnyadir = document.getElementById("anyadirgasto-formulario");
    let cancelarElHandler = new CancelarHandleFormulario(formulario, btnAnyadir); 
    let btnEnviarApi = document.querySelector('button.gasto-enviar-api');
    
    btnCancelar.addEventListener("click", cancelarElHandler);
    btnAnyadir.setAttribute("disabled", "true");
    btnEnviarApi.addEventListener('click', EnviarApiHandle);//
   
    let controles = document.getElementById("controlesprincipales");
    controles.append(formulario);
}

function manejadoraEventoFormulario(event) {
    //Previene el envío del formulario.
    event.preventDefault();
    let formulario = event.currentTarget;

    let descripcion = formulario.querySelector("#descripcion").value;
    let valor = formulario.querySelector("#valor").value;
    let valorGasto = parseFloat(valor);
    let fecha = formulario.querySelector("#fecha").value;
    let etiquetas = formulario.querySelector("#etiquetas").value;
    let arrayEtiquetas = etiquetas.split(',').map(etiqueta => etiqueta.trim());

    let nuevoGastoForm = new gestorPresu.CrearGasto(descripcion, valorGasto, fecha);
    nuevoGastoForm.anyadirEtiquetas(...arrayEtiquetas);

    gestorPresu.anyadirGasto(nuevoGastoForm);

    repintar();

    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");  
}

function CancelarHandleFormulario(form, botonAnyadir) {
   
    this.formulario = form;
    this.btnAnyadir = botonAnyadir;

    this.handleEvent = function () {
        this.formulario.remove();
        this.btnAnyadir.removeAttribute("disabled");
    }
}

function EditarHandleFormulario(gasto, divGasto) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    this.gasto = gasto;
    this.handleEvent = function () {
        let btnEditar = divGasto.querySelector("button.gasto-editar-formulario");
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarHandler = new CancelarHandleFormulario(formulario, btnEditar);

        btnCancelar.addEventListener("click", cancelarHandler);
        btnEditar.setAttribute("disabled", "true");
        formulario.querySelector("#descripcion").value = this.gasto.descripcion;
        formulario.querySelector("#valor").value = this.gasto.valor;
        formulario.querySelector("#fecha").value = this.gasto.fecha;
        formulario.querySelector("#etiquetas").value = this.gasto.etiquetas.join(', ');
    
        let submitHandler = (event) => {
            event.preventDefault();
            let descripcion = formulario.querySelector("#descripcion").value;
            let valor = formulario.querySelector("#valor").value;
            let fecha = formulario.querySelector("#fecha").value;
            let etiquetasTiene = formulario.querySelector("#etiquetas").value;
            let arrayEtiquetas = etiquetasTiene.split(',').map(function (etiqueta) {
                return etiqueta.trim(); });
            let nuevoValor = parseFloat(valor);

            this.gasto.actualizarDescripcion(descripcion);
            this.gasto.actualizarValor(nuevoValor);
            this.gasto.actualizarFecha(fecha);
            this.gasto.anyadirEtiquetas(...arrayEtiquetas);

            repintar();
        };
        formulario.addEventListener('submit', submitHandler);
        divGasto.append(plantillaFormulario);

        let btnEditarGastoApi = formulario.querySelector("button.gasto-enviar-api"); // falta probar: SubmitEditarHandleFormularioApi
        btnEditarGastoApi.addEventListener("click", new EditarHandleFormularioApi(gasto, formulario)); //!

    }
}


function filtrarGastosWeb() { 
    this.handleEvent = function (event) { 
        event.preventDefault();
        let filtradoForm = event.currentTarget;
        let descripcionContiene = filtradoForm.elements['formulario-filtrado-descripcion'].value;
        let valorMinimo = filtradoForm.elements['formulario-filtrado-valor-minimo'].value;
        let valorMaximo = filtradoForm.elements['formulario-filtrado-valor-maximo'].value;
        let fechaDesde = filtradoForm.elements['formulario-filtrado-fecha-desde'].value;
        let fechaHasta = filtradoForm.elements['formulario-filtrado-fecha-hasta'].value;
        let etiquetasTiene = filtradoForm.elements['formulario-filtrado-etiquetas-tiene'].value;
        valorMinimo = parseFloat(valorMinimo);
        valorMaximo = parseFloat(valorMaximo);
        // Transformo a etiquetasTiene una vez
        let etiquetasTransformadas = etiquetasTiene != null ? gestorPresu.transformarListadoEtiquetas(etiquetasTiene) : null;
        let gastosFiltrados = gestorPresu.filtrarGastos({
                    descripcionContiene,
                    valorMinimo,
                    valorMaximo,
                    fechaDesde,
                    fechaHasta,
                    etiquetasTiene: etiquetasTransformadas });
        let listaFiltrada = document.getElementById('listado-gastos-completo');
            listaFiltrada.innerHTML = "";

        for (let gasto of gastosFiltrados) {
            mostrarGastoWeb('listado-gastos-completo', gasto);
        }
    }
}

function guardarGastosWeb() { 
    this.handleEvent = function () {
        localStorage.GestorGastosDWEC = JSON.stringify(gestorPresu.listarGastos());
    }
}

function cargarGastosWeb() {
    this.handleEvent = function () {
        let cargaDeGastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));

        if (!cargaDeGastos) {
            gestorPresu.cargarGastos([]);
        }
        else {
            gestorPresu.cargarGastos(cargaDeGastos);
        }
        repintar();
     }
}

//GET al servidor -- trae lista de gastos del servidor
//Añade un manejador de eventos necesario para gestionar el evento click del botón.gasto - enviar - api.
async function cargarGastosApi() { //* Mejorada

    let usuario = document.getElementById("nombre_usuario").value;
    let urlUsusario = Url + usuario;
    let respuesta = await fetch(urlUsusario);
   
    console.log("usuario de url: " + usuario);
    console.log(urlUsusario);
   
    if (respuesta.ok) { // Verifica solicitud  exitosa- HTTP: 200-299
        let respuestaJson = await respuesta.json();
        gestorPresu.cargarGastos(respuestaJson); // Carga los datos del GET(en JSON).
        repintar()
    } else {
        globalThis.alert('Error en la solicitud HTTP: ' + respuesta.status)
        return respuesta.json();
    }
}
//DELETE
function BorrarApiHandle(gasto) {
    this.handleEvent = async (event) => {
        let usuario = document.getElementById('nombre_usuario').value
        let resultado = await fetch(Url + usuario + '/' + gasto.gastoId, {
            method: 'DELETE'
        })
        if (resultado.ok) {
            cargarGastosApi()
            repintar()
        } else {
            globalThis.alert('Error HTTP: ' + resultado.status)
        }
    }
}
//POST
function EnviarApiHandle() {//!............................... GUILLE: ______No funciona, no toma valor de descripción, valor, fecha ni etiquetas _____!!!
    this.handleEvent = async function (event) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        let descripcionApi = formulario.querySelector("#descripcion").value
        let valorApi = formulario.elements.valor.value;
        let fechaApi = formulario.elements.fecha.value;
        let etiquetasApi = formulario.elements.etiquetas.value;
        valorApi = parseFloat(valorApi);
        fechaApi = +new Date(fechaApi);
        let arrayEtiquetas = etiquetasApi.split(',');
        let gastoNuevoApi = {
            descripcion: descripcionApi,
            valor: valorApi,
            fecha: fechaApi,
            etiquetas: arrayEtiquetas
        };

        let usuario = document.getElementById("nombre_usuario").value;
        let url = Url + usuario;
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(gastoNuevoApi)
        }).then(cargarGastosApi);
    }
}

//PUT
function EditarHandleFormularioApi(gasto, formulario) {
    this.gasto = gasto;
    this.formulario = formulario;

    this.handleEvent = async function () {
        let formulario = this.formulario;

        let descripcion = formulario.elements.descripcion.value;
        let valor = Number(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        etiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        let usuario = document.getElementById("nombre_usuario").value;
        let url = Url + usuario + '/' + gasto.gastoId;
        await fetch( url, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json;charset=utf-8',
            },
            body: JSON.stringify(this.gasto)
        }).then(
            response => {
                if (response.ok) cargarGastosApi();
            }
        ).catch(
            reason => alert(`Se ha producido un Error: ${reason}`)
        );
    };
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    EditarHandleFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi,
};
