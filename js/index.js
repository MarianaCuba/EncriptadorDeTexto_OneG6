function boton(botonId, isEnabled){
    let boton = document.getElementById(botonId);
    if (isEnabled) {
        boton.removeAttribute('disabled');
    } else {
        boton.setAttribute('disabled', 'true');
    }
}

function copyTxt() {
    var texto = document.getElementById("input_txt");
    texto.select();
    navigator.clipboard.writeText(texto.value).then(()=> {
        console.log('Texto copiado correctamente');
    }).catch(error =>{
        console.error('Error al copiar texto: ',error);
    })
}

function copiarTextoEncriptado() {
    let textoCopiado = document.getElementById("result-text").textContent;
    document.getElementById("input_txt").value = textoCopiado;
    asignarTexto("result-text", "...")
    boton("btn_copy", true);
    copyTxt();
}

function asignarTexto(elemento, texto) {
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function encriptar() {
    let input_txt = document.getElementById("input_txt").value;

    // Verificar si el cuadro de texto está vacío
    if (!input_txt.trim()) {
        alert("Ingrese una palabra antes de encriptar.");
        return;
    }

    let textoEncriptado = procesoEncriptar(input_txt);

    boton("btn_copy", true);
    asignarTexto("result-text", textoEncriptado);
    asignarTexto("title_content_text", "Texto Encriptado.");
}

function procesoEncriptar(inputTexto){
    let texto =inputTexto.toLowerCase();
    let listaTextoProceso = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat" };
    texto = texto.split("");

    texto.forEach(function (char, index) {
        Object.entries(listaTextoProceso).forEach(function ([key, value]) {
            if (char === key) {
                texto[index] = value;
            }
        });
    });

    document.getElementById("result-image").style.display = "none";

    return texto.join("");

}

function desencriptar(){
    let texto = document.getElementById("input_txt").value;

    if(!texto.trim()){
        alert("Debe ingresar una palabra antes ");
        return;
    }

    let textoDesencriptado = procesoDesencriptador(texto);

    asignarTexto("result-text",textoDesencriptado );
    asignarTexto("title_content_text", "Texto Desencriptado.");
}

function procesoDesencriptador(inputTexto){
    let text = inputTexto.toLowerCase();
    let listaTextoProceso = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat" };

    Object.entries(listaTextoProceso).forEach(function ([key, value]) {
        const regex = new RegExp(value, 'g');
        text = text.replace(regex, key);
    });

    return text;

}