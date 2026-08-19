const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const resultado = document.querySelector(".mensaje");

btn.addEventListener("click", displayResultado)

function displayResultado() {

    let cobro = (input.value);
    let propina = cobro * 0.10;
    if (propina >= 5000) {
        // el más sirve para conectar las cosas no con ","  :v
        resultado.innerHTML = "La propina es de: $" + propina + "," + " que buena propina";
    } else {
        resultado.innerHTML = "La propina es de: $" + propina + "," + " gracias por su propina ";
    }
}
