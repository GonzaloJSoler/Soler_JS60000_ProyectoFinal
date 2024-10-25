//SEGUNDA PRE-ENTREGA JS60000 SOLER GONZALO, CODERHOUSE
let usuario = null; 

function capturarDatos() {
    let nombre = prompt("Ingrese su nombre:");
    let edad = prompt("Ingrese su edad:");
    let email = prompt("Ingrese su email:");
    if (!nombre || !edad || !email) {
        alert("Por favor, complete todos los campos.");
        return null; 
    }
    usuario = {
        nombre: nombre,
        edad: parseInt(edad), 
        email: email
    };
    alert("Datos registrados:\nNombre: " + usuario.nombre + "\nEdad: " + usuario.edad + "\nEmail: " + usuario.email);
}

function pedirNumero(mensaje) {
    let numero;
    do {
        numero = prompt(mensaje);
        if (numero === null) {
            return null; 
        }
    } while (isNaN(numero) || numero.trim() === ""); 
        return parseFloat(numero); 
}

function realizarOperacion() {
    if (!usuario) {
        alert("Primero debes registrar los datos del usuario.");
        return;
    }
    let operacion = prompt("¿Qué operación deseas realizar? (suma, resta, multiplicacion)").toLowerCase();
    let numero1 = pedirNumero("Ingrese el primer número:");
    if (numero1 === null) return;
    let numero2 = pedirNumero("Ingrese el segundo número:");
    if (numero2 === null) return;
    let resultado;
    if (operacion === "suma") {
        resultado = numero1 + numero2;
    } else if (operacion === "resta") {
        resultado = numero1 - numero2;
    } else if (operacion === "multiplicacion") {
        resultado = numero1 * numero2;
    } else {
        alert("Operación no válida. Intenta nuevamente.");
        return; 
    }
    alert("El resultado de la " + operacion + " es: " + resultado);
}
document.getElementById("registrarBtn").addEventListener("click", capturarDatos);
document.getElementById("calcularBtn").addEventListener("click", realizarOperacion);
