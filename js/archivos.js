window.onload = function () {

    xhr = new XMLHttpRequest();


    tabla = document.getElementById('tabla');
    form = document.getElementById('form');
    form.hidden = true;
    botonAgregar = document.getElementById('agregar');

    traerAutos();

};




function armarTabla(autos) {

    var thead;

    if (thead == null) {
        thead = document.createElement('thead');
        var tr = document.createElement('tr');


        var encabezados = ['id', 'make', 'model', 'year'];
        thead.appendChild(tr);

        for (var i in encabezados) {

            var th = document.createElement('th');
            var text = document.createTextNode(encabezados[i]);
            th.appendChild(text);
            tr.appendChild(th);

        }


        tabla.appendChild(thead);

    }


    for (var i in autos) {

        insertarFilaNueva(autos[i]);

    }


    document.getElementById('agregar').addEventListener('click', () => {

        abrirFormulario()

        document.getElementById('fila1').hidden = true;

        mostrarFormulario();


    });



}

function abrirFormulario() {

    tabla.hidden = true;
    form.hidden = false;

}

function obtenerDatosFila(tr) {

    nuevoAño = {
        "id": tr.children[0].textContent,
        "year": tr.children[3].children[0].value

    }

    modificarAño(nuevoAño);

}

function cerrarFormulario() {

    var child = form.lastElementChild;
    while (child) {
        form.removeChild(child);
        child = form.lastElementChild;
    }


    form.hidden = true;
    document.getElementById('fila1').hidden = false;


}



function mostrarFormulario() {


    crearFormulario();
    crearBotones();
    eventosBotones();

}


function crearBotones() {


    var fila = document.createElement('tr');

    var botonGuardar = document.createElement("button");
    botonGuardar.setAttribute('id', 'btnGuardar');
    botonGuardar.setAttribute("type", "button");
    botonGuardar.textContent = 'Guardar';



    var botonCancelar = document.createElement("button");
    botonCancelar.setAttribute("type", "button");
    botonCancelar.textContent = 'Cerrar';
    botonCancelar.setAttribute('id', 'btnCancelar');

    fila.appendChild(botonGuardar);
    fila.appendChild(botonCancelar);
    form.appendChild(fila);

}



function crearFormulario() {

    var autoA = ["Marca", "Modelo", "Año"];

    var form = document.getElementById("form");

    autoA.forEach(function (elemento, indice) {

        var label = document.createElement("label");
        label.style.display = "block";
        var datoLabel = document.createTextNode(elemento);
        label.appendChild(datoLabel);
        form.appendChild(label);

        var select = document.createElement('select');


        if (elemento == 'Año') {
            var select = createSelect();
            select.setAttribute('id', 'selectFormulario');

            form.appendChild(select);

        }else{

            dato = document.createElement("input");
            dato.setAttribute("id", elemento);
            dato.setAttribute("type", "text");
            dato.style.display = "block";
            dato.setAttribute('position', 'fixed');

            dato.placeholder = elemento;

            form.appendChild(dato);
        }
       
    });


}






function eventosBotones() {

    document.getElementById('btnCancelar').addEventListener('click', () => {
        cerrarFormulario();

        tabla.hidden = false;

    });



    document.getElementById('btnGuardar').addEventListener("click", () => {

        retorno = obtenerDatosForm();

        if (retorno != null) {


            cerrarFormulario();
            setSpinner('show');
            tabla.hidden = false;
            agregarAuto(retorno);

        }


    });

}

function setSpinner(display) {

    body = document.getElementById('body');

    if (display == "show") {

        body.classList.add("showSpinner");

    } else {


        body.classList.remove("showSpinner");
        tabla.hidden = false;


    }

}


function obtenerDatosForm() {


    var marca = document.getElementById('Marca').value;
    var modelo = document.getElementById('Modelo').value;
    var año = document.getElementById('selectFormulario').value;

    if (validarCampos(marca, modelo, año)) {

        retornoJson = {
            "make": marca,
            "model": modelo,
            "year": año,
        }
    } else {

        retornoJson = null;

    }

    return retornoJson;

}

function validarCampos(marca, modelo, año) {


    var retorno = true;
    if (marca.length <= 3) {

        document.getElementById('Marca').style.borderColor = "rgb(153, 17, 17)";

        retorno = false;

    } else {

        document.getElementById('Marca').style.borderColor = "#7e66b8";

    }


    if (modelo.length <= 3) {

        document.getElementById('Modelo').style.borderColor = "rgb(153, 17, 17)";

        retorno = false;

    } else {

        document.getElementById('Modelo').style.borderColor = "#7e66b8";

    }


    if (año < 2000 || año > 2020) {

        document.getElementById('selectFormulario').style.borderColor = "rgb(153, 17, 17)";

        retorno = false;

    } else {

        document.getElementById('selectFormulario').style.borderColor = "#7e66b8";

    }


    return retorno;


}





function insertarFilaNueva(datosNuevos) {


    var tr = document.createElement('tr');

    tabla.appendChild(tr);

    var td = document.createElement('td');
    text = document.createTextNode(datosNuevos.id);

    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement('td');
    text = document.createTextNode(datosNuevos.make);

    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement('td');
    text = document.createTextNode(datosNuevos.model);

    td.appendChild(text);
    tr.appendChild(td);


    var td = document.createElement('td');

    tr.appendChild(td);
    var select = createSelect();
    td.appendChild(select);


    if (datosNuevos.year < 2000) {

        option = document.createElement("option");
        option.setAttribute("value", datosNuevos.year);

        var texto = document.createTextNode(datosNuevos.year);
        option.appendChild(texto);

        select.appendChild(option);


    }
    select.value = datosNuevos.year;

    tabla.appendChild(tr);

    select.addEventListener('change', function () {

        setSpinner('show');

        obtenerDatosFila(select.parentNode.parentNode);

    });

}


function cambiarFila(nuevoAño) {

    document.querySelectorAll('tr').forEach(function (value, index) {

        if (value.children[0].textContent == nuevoAño.id) {

            value.children[3].children[0].value = nuevoAño.year;


        }

    });


}


function eliminarFilaDom(jsonNuevo) {



    document.querySelectorAll('tr').forEach(function (value, index) {


        if (value.children[0].textContent == jsonNuevo.id) {

            tabla.removeChild(value);
        }

    });
}


function createSelect() {


    var select = document.createElement('select');
    select.setAttribute('class', "selectTable");

    for (var i = 2000; i <= 2020; i++) {

        option = document.createElement("option");
        option.setAttribute("value", i);

        var texto = document.createTextNode(i);
        option.appendChild(texto);

        select.appendChild(option);

    }


    return select;
}