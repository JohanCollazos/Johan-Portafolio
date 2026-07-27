const claro = document.getElementById("btnClaro");
const oscuro = document.getElementById("btnOscuro");
const lectura = document.getElementById("btnLectura");

claro.addEventListener("click", () => {
    document.body.className = "claro";
})

oscuro.addEventListener("click", () => {
    document.body.className = "oscuro";
})

lectura.addEventListener("click", () => {
    document.body.className = "lectura";
})