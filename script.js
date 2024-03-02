let intentos = 6;
let palabra;
async function obtenerPalabraAleatoria() {
    const response = await fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5');
    const data = await response.json();
    return data[0].toUpperCase();
}
async function init() {
    palabra = await obtenerPalabraAleatoria();
    console.log('Palabra seleccionada:', palabra);
    console.log('Esto se ejecuta solo cuando se carga la página web');
}
window.addEventListener('load', init);
const button = document.getElementById("guess-button");
function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO.length !== 5) {
        alert("Por favor, ingresa una palabra de 5 letras.");
        return;
    }
    if (INTENTO === palabra) {
        console.log("GANASTE!");
        terminarJuego("<h1>¡GANASTE! :)</h1>", 'green');
        return;
    }
    const ROW = document.createElement('div');
    ROW.className = 'row centered'; 
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabra[i]) {
            console.log(INTENTO[i], "VERDE");
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) {
            console.log(INTENTO[i], "AMARILLO");
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {
            console.log(INTENTO[i], "GRIS");
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    intentos--;
    if (intentos === 0) {
        console.log("PERDISTE!");
        terminarJuego("<h1>¡PERDISTE! :(</h1>", 'red');
    }
}
button.addEventListener("click", intentar);
function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();

    return intento;
}
function terminarJuego(mensaje, color) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;

    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;

    const CORRECT_WORD_ROW = document.createElement('div');
    CORRECT_WORD_ROW.className = 'row centered'; 
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = palabra[i];
        SPAN.style.backgroundColor = color;
        CORRECT_WORD_ROW.appendChild(SPAN);
    }
    GRID.appendChild(CORRECT_WORD_ROW);
}
const GRID = document.getElementById("grid");