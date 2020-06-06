

function traerAutos() {

    setSpinner('show');


    var url = "http://localhost:3000/autos";
    xhr.open('GET', url, true);
    xhr.onreadystatechange = manejadorRespuesta;

    xhr.send();
}


function manejadorRespuesta() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            autos = JSON.parse(xhr.responseText);

            armarTabla(autos);
            setSpinner();
            


        }
    } 

}


function modificarAño(nuevoAño) {
    var url = "http://localhost:3000/editarYear";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(nuevoAño));
    xhr.onreadystatechange = manejadorRespuesta2;


}



function manejadorRespuesta2() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var respuesta = JSON.parse(xhr.responseText);
            if (respuesta.type == "ok") {

                if (nuevoAño  != null) {
                    cambiarFila(nuevoAño);
                    setSpinner();
                }
            }
        }
    }

}


function agregarAuto(retorno) {

    var url = "http://localhost:3000/nuevoAuto";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(retorno));
    xhr.onreadystatechange = manejadorRespuesta3;

}



function manejadorRespuesta3() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var respuesta = JSON.parse(xhr.responseText);
            if (respuesta.type != "error") {

                cerrarFormulario();
                setSpinner();

                insertarFilaNueva(respuesta);

            }
        }
    }

}