//Total de preguntas del juego 

const TOTAL_PREGUNTAS = 10

//variable que cuenta cantidad de preguntas respondidas correctamente
let cantidadAcertadas = 0;

//variable que controla la pregunta actual, comienza en -1 pq la primera pregunta es la 0 
let preguntaActual = -1;

//arreglo con los estados de las preguntas 
let estadoPreguntas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//preguntas guardadas
const bd_juego = [
    {
        id: 'A',
        pregunta: "¿Empresa reconocida que se dedica a los servidores?",
        respuesta: "amazon"
    },
    {
        id: 'B',
        pregunta: "¿Termino en ingles que hace referencia a una copia de seguridad?",
        respuesta: "backup"
    },
    {
        id: 'C',
        pregunta: "¿Nombre de la memoria que almacena termporalmente los datos de la computadora?",
        respuesta: "cache"
    },
    {
        id: 'D',
        pregunta: "¿Archivo que controla los perisfericos que se conectan a la computadora?",
        respuesta: "drivers"
    },
    {
        id: 'E',
        pregunta: "¿Mezclar los datos para protegerlos como medida de seguridad, es decir convertir texto normal a texto cifrado?",
        respuesta: "encriptar"
    },
    {
        id: 'F',
        pregunta: "¿Famosa red social creada por Mark Zuckerberg?",
        respuesta: "facebook"
    },
    {
        id: 'G',
        pregunta: "¿Lenguaje de programacion creado por Google?",
        respuesta: "go"
    },
    {
        id: 'H',
        pregunta: "¿Lenguaje utilizado para estructurar las paginas web?",
        respuesta: "html"
    },
    {
        id: 'I',
        pregunta: "¿Aspecto que presentan los programas tras su ejecucion mediante el cual ejercemos la comunicacion con estos?",
        respuesta: "interfaz"
    },
    {
        id: 'J',
        pregunta: "¿Lenguaje de programacion con el cual se diseño el sistema operativo android?",
        respuesta: "java"
    }
]

//variables para controlar el tiempo
const timer = document.getElementById('tiempo');
//tiempo del juego en segundos 
const TIEMPO_DEL_JUEGO = 60;
//variable que indica el timepo restante
let tiempoRestante = TIEMPO_DEL_JUEGO;
//variable que maneja el contador del tiempo 
let countdown;

//creamos las letras de la A a la J 

const container = document.querySelector('.container');
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.textContent = String.fromCharCode(i + 64);
    circle.id = String.fromCharCode(i + 64);
    container.appendChild(circle);
    // si esto falla puede ser pq en el pdf decia 96
    const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

let comenzar = document.getElementById('comenzar');
comenzar.addEventListener('click', () => {
    document.getElementById('pantalla-inicial').style.display = 'none';
    document.getElementById('pantalla-juego').style.display = 'block';

    //iniciamos contador del tiempo
    iniciarContador();
    //cargamos las preguntas
    cargarPreguntas();
});

function iniciarContador() {
    countdown = setInterval(() => {
        //restamos un segundo al tiempo restante
        tiempoRestante--;
        //actualizamos el tiempo en el DOM 
        timer.innerText = tiempoRestante;
        //si el tiempo llega a 0 se detiene el contador
        if (tiempoRestante === 0) {
            clearInterval(countdown);
            mostrarPantallaFinal();
        }
    }, 1000)
}

//función para cargar las preguntas 
function cargarPreguntas() {
    preguntaActual++;
    //controlo si he llegado al final de las preguntas, para iniciar de nuevo
    if (preguntaActual >= TOTAL_PREGUNTAS) {
        preguntaActual = 0;
    }
    //controlo si la pregunta ya fue respondida
    if (estadoPreguntas.indexOf(0) >= 0) {
        while (estadoPreguntas[preguntaActual] === 1) {
            preguntaActual++;
            if (preguntaActual >= TOTAL_PREGUNTAS) {
                preguntaActual = 0
            }
        }
        //ahora si buscamos la pregunta en la base de datos 
        document.getElementById('letra-pregunta').textContent = bd_juego[preguntaActual].id;
        document.getElementById('pregunta').textContent = bd_juego[preguntaActual].pregunta;
        let letra = bd_juego[preguntaActual].id;
        document.getElementById(letra).classList.add('pregunta-actual');
    } else {
        //juego termina si no hay preguntas por responder
        clearInterval(countdown);
        mostrarPantallaFinal();
    }
}

//detectamos el cambio del input 
let respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function (event) {
    //detecta si se presiona la tecla enter
    if (event.key === "Enter") {
        if (respuesta.value === "") {
            alert("Debe ingresar una respuesta");
            return;
        }
        //obtengo la respuesta ingresada
        let respuestaIngresada = respuesta.value.toLowerCase();
        controlarRespuesta(respuestaIngresada);
    }
});

function controlarRespuesta(respuestaIngresada) {
    //control de respuesta correcta
    if (respuestaIngresada == bd_juego[preguntaActual].respuesta) {
        //alert("Respuesta correcta")
        cantidadAcertadas++;

        //cambio el estado de la pregunta a 1
        estadoPreguntas[preguntaActual] = 1;

        let letra = bd_juego[preguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("bien-respondido");
    } else {
        estadoPreguntas[preguntaActual] = 1;
        let letra = bd_juego[preguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("mal-respondido");
    }
    //limpio el imput
    respuesta.value = "";
    //cargo la siguiente pregunta
    cargarPreguntas();
}

//boton para pasar sin responder
let pasar = document.getElementById("pasar");
pasar.addEventListener("click", function () {
    let letra = bd_juego[preguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    cargarPreguntas();
});

//boton para responder las preguntas
let responder = document.getElementById("responder");
responder.addEventListener("click", function () {
    if (respuesta.value === "") {
        alert("Debe ingresar una respuesta");
        respuesta.focus();
        respuesta.value = "";
        return;
    }
    let respuestaIngresada = respuesta.value.toLowerCase();
    controlarRespuesta(respuestaIngresada);
    respuesta.focus();
});

//mostrar pantalla final
function mostrarPantallaFinal() {
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    document.getElementById("puntaje").textContent = (cantidadAcertadas * 100) / TOTAL_PREGUNTAS + "% de aciertos";
    clearInterval(countdown);
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
}

//boton para reiniciar el juego
let reiniciar = document.getElementById("reiniciar");
reiniciar.addEventListener("click", function () {
    //reiniciamos las variables 
    cantidadAcertadas = 0;
    preguntaActual = -1;
    tiempoRestante = TIEMPO_DEL_JUEGO;
    timer.innerText = tiempoRestante;
    estadoPreguntas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //quitamos las clases de los circulos 
    let circulos = document.getElementsByClassName("circle");
    for (i = 0; i < circulos.length; i++) {
        circulos[i].classList.remove("pregunta-actual");
        circulos[i].classList.remove("bien-respondido");
        circulos[i].classList.remove("mal-respondido");
    }
    //mostramos pantalla inicial
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    respuesta.value = "";
    respuesta.focus();
    iniciarContador();
    cargarPreguntas();
});




