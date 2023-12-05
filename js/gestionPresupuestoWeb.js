
function mostrarDatoEnId(id, valor) {
    document.getElementById(id).innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    // Obtén el elemento objetivo
    let elementoObj = document.getElementById(idElemento);

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
    /*if (gasto.fecha instanceof Date) {
        fechaFormateada = gasto.fecha.toLocaleDateString();
    }*/
    divGasFecha.innerText = fechaFormateada;

    // Agrega etiquetas
    for (let etiqueta of gasto.etiquetas) {
        etiqueta = gasto.etiquetas[i];
        let divEtiqueta = document.createElement('span');
        divEtiqueta.className = "gasto-etiquetas-etiqueta";
        divEtiqueta.append(`${etiqueta},`)

        // Evita agregar una coma al final del último elemento
        if (i < gasto.etiquetas.length - 1) {
            divEtiqueta.append(', ');
        }

        divGasEtiquetas.append(divEtiqueta);
    }

    // Agrega los elementos al divGasto
    divGasto.append(divGasDesc);
    divGasto.append(divGasFecha);
    divGasto.append(divGasValor);
    divGasto.append(divGasEtiquetas);

    // Agrega el divGasto al elemento objetivo
    elementoObj.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtén el elemento objetivo
    let elementoObjetivo = document.getElementById(idElemento);

    // Creo elemento div para la agrupación
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";

    // Creo elemento h1 para mostrar el periodo
    let h1Periodo = document.createElement('h1');
    h1Periodo.innerText = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1Periodo);

    // Itera sobre las propiedades del objeto agrup
    for (let clave in agrup) {
        if (Object.prototype.hasOwnProperty.call(agrup, clave)) {
            // Crea el elemento div para cada propiedad
            let divAgrupacionDato = document.createElement('div');
            divAgrupacionDato.className = "agrupacion-dato";

            // Crea el elemento span para la clave (nombre de la propiedad)
            let spanClave = document.createElement('span');
            spanClave.className = "agrupacion-dato-clave";
            spanClave.innerText = clave;

            // Crea el elemento span para el valor (cantidad)
            let spanValor = document.createElement('span');
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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};