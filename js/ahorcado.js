

var btnIniciar        = document.querySelector("#iniciar-juego");
var inputPalabra      = document.querySelector("#input-nueva-palabra");
var btnReiniciar      = document.querySelector("#reiniciar-juego")



var juegoIniciado = false;
var sortearPalabra;
var i = [];
var arrayPalabras;
LetraIngresada = [];
LetrasCorrectas = [];
LetrasIncorrectas = [];
let letrasSimples = [];
//--------funcion para generar un array sin letras repetidas
//--------que sera usado para verificar el ganador
function RepeticionesDeLetras(){
    for (i=0;i<sortearPalabra.length;i++){
        if(!letrasSimples.includes(sortearPalabra[i])){
            letrasSimples.push(sortearPalabra[i])
        }
    }
}
//--------sortea una palabra aleatoria del array original
//--------luego elimina esa palabra del array para que no repita
function Sorteo(){
    var aleotario = Math.floor(Math.random()*palabras.length);
    sortearPalabra = palabras[aleotario];
    palabras.splice(aleotario,1);
    return sortearPalabra;
}
//--------crea un array para ser usado como referencia para el juego
function CrearPalabras(palabra){
    separada = palabra.split("");
    arrayPalabra = separada;
}
//--------asigna la funcionalidad a los botones de inicio y reinicio
btnIniciar.addEventListener("click",function(event){
    event.preventDefault();
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
    iniciarJuego();
})
btnReiniciar.addEventListener("click",function(event){
    event.preventDefault();
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
    iniciarJuego();
})

//--------nuclea las acciones necesarias para iniciar un nuevo juego
function iniciarJuego(){
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
    muerte();
    Sorteo();
    CrearPalabras(sortearPalabra);
    dibujarGuiones();
    RepeticionesDeLetras();
    juegoIniciado = true;
    arrayLetraIngresada = [];
    arrayLetrasCorrectas = [];
    arrayLetrasIncorrectas = [];
}
//--------genera un array con los indices de las letras ingresadas 
//--------por los usuarios, esto permite que si hay letras repetidas
//--------dentro de la palabra original pueda dibujar todas
//--------las instancias de esa letra
function buscarIndices(){
    if (juegoIniciado){
    var indiceBuscado = arrayPalabra.indexOf(arrayLetraIngresada[0]);
        while (indiceBuscado != -1) { //el -1 es el return de indexOf si no encuentra el elemento
            i.push(indiceBuscado);
            indiceBuscado = arrayPalabra.indexOf(arrayLetraIngresada[0], indiceBuscado + 1);
  }
}
}
//--------dibuja la cantidad de guiones necesarios para la palabra en juego
function dibujarGuiones(){
    var inicioX = 350;
    var inicioY = 610;
    var contador = 0;
    var nLetras = sortearPalabra.length;
    while (contador<nLetras){
        pincel.fillStyle = "red";
        pincel.fillRect(inicioX+(40*contador),inicioY,30,4);
        contador++;
    }
}
//--------coloca cada letra en el lugar que deberia aparecer
function dibujarletras(arrOrden){
    var inicioX = 358;
    var inicioY = 600;
        for(i=0;i<arrOrden.length;i++){
            pincel.fillStyle = "blue";
            pincel.font = "20px Georgia";
            pincel.fillText(arrayLetraIngresada[0],inicioX+(40*arrOrden[i]),inicioY);
        }
        i = [];
}
//--------evento para capturar las teclas del usuario, en el cual
//--------comprueba si son letras y no caracteres especiales o numeros
//--------almacena las letras en uno de dos arrays, de acuerdo a si la
//--------letra esta o no dentro de la palabra sorteada.
//--------tambien dibuja la pieza del ahorcado en caso de que sea necesario
//--------y comprueba si el juego ha terminado
document.addEventListener("keyup", function(event){
    arrayLetraIngresada = [];
    var letra = event.key.toUpperCase();
    var codigo = letra.charCodeAt();
    if (juegoIniciado){
    if(codigo>64 && codigo<91){
        arrayLetraIngresada.push(letra);
        buscarIndices();
        dibujarletras(i);
        var comparador = arrayLetrasIncorrectas.length;
        if(arrayPalabra.includes(letra)){
            if(!arrayLetrasCorrectas.includes(letra)){
                arrayLetrasCorrectas.push(letra)
            }
        }else if(!arrayLetrasIncorrectas.includes(letra)){
            arrayLetrasIncorrectas.push(letra)
        }
        if(comparador<arrayLetrasIncorrectas.length){
            LetrasErroneas(arrayLetrasIncorrectas) 
        }
        dibujarAhorcado();
        }
    Ganador();
    Perdedor();
    } 
});
//--------dibuja las letras que no estan en la palabra sorteada
function LetrasErroneas(letrasIncorrectas){
    var inicioX = 400;
    var inicioY = 200;
    pincel.fillStyle = "black";
    pincel.font = "35px  sans-serif";
    pincel.fillText("ERRORES " + letrasIncorrectas.toString(),inicioX,inicioY);
}
//--------comprueba si el juego ha terminado con resultado positivo
function Ganador(){
    let palabraOriginalsinLetrasRepetidas = letrasSimples.sort().toString();
    let letrasErroneasIngresadas = arrayLetrasCorrectas.sort().toString();
    if(palabraOriginalsinLetrasRepetidas===letrasErroneasIngresadas){
        pincel.fillStyle = "black";
        pincel.font = "50px sans-serif";
        pincel.fillText("GANASTE!",600,400);
        juegoIniciado = false;
        btnReiniciar.focus();
        letrasSimples = [];
    }
}
//--------comprueba si el juego ha terminado con resultado negativo
function Perdedor(){
    if(arrayLetrasIncorrectas.length>5){
        pincel.fillStyle = "BLACK";
        pincel.font = "50px sans-serif";
        pincel.fillText("PERDISTE!",600,400);
        juegoIniciado = false;
        alert("La palabra correcta era " + sortearPalabra);
        btnReiniciar.focus();
        letrasSimples = [];
    }
}
//--------dibuja la pieza del ahorcado correspondiente segun la cantidad de errores
function dibujarAhorcado(){
    let iniciador = arrayLetrasIncorrectas.length;
    if (iniciador===1){
        cabeza()
    }else if(iniciador===2){
        cuerpo()
    }else if(iniciador===3){
        brazoIzquierdo()
    }else if(iniciador===4){
        brazoDerecho()
    }else if(iniciador===5){
        piernaIzquierda()
    }else if(iniciador===6){
        piernaDerecha()
    }
}
