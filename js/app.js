//SEGUNDA PRE-ENTREGA JS60000 SOLER GONZALO, CODERHOUSE
AOS.init({
    duration: 1000,  
    easing: 'ease-in-out', 
    once: true  
});
//Simulador de registro de datos
let usuarios = [];

function cargarUsuarios() {
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (usuariosGuardados) {
        usuarios = JSON.parse(usuariosGuardados);
    }
    mostrarUsuarios();
}

function guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrarUsuarios() {
    const contenedor = document.getElementById("listaUsuarios");
    contenedor.innerHTML = "";  

    if (usuarios.length === 0) {
        contenedor.innerHTML = "<p>No hay usuarios registrados.</p>";
        return;
    }

    usuarios.forEach((usuario, index) => {
        const usuarioDiv = document.createElement("div");
        usuarioDiv.textContent = `${index + 1}. Nombre: ${usuario.nombre}, Edad: ${usuario.edad}, Email: ${usuario.email}`;
        contenedor.appendChild(usuarioDiv);

        setTimeout(() => {
            usuarioDiv.classList.add('visible');
        }, 50);  
    });
}



document.getElementById("registrarBtn").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const email = document.getElementById("email").value.trim();
    const errores = [];

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        errores.push("El nombre solo puede contener letras.");
    }
    if (!/^\d+$/.test(edad) || edad <= 0) {
        errores.push("La edad debe ser un número válido.");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        errores.push("El email debe tener un formato válido.");
    }
    if (errores.length > 0) {
        Swal.fire("Error en el registro", errores.join("<br>"), "error");
        return;
    }

    const usuario = { nombre, edad: parseInt(edad), email };
    usuarios.push(usuario);
    guardarUsuarios(); 
    mostrarUsuarios(); 

    document.getElementById("registroForm").reset();
    Swal.fire("¡Usuario registrado!", "El usuario se registró correctamente.", "success");
});


document.getElementById("limpiarBtn").addEventListener("click", function () {
    Swal.fire({
        title: "¿Quieres limpiar todos los registros?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Limpiar",
        denyButtonText: "No limpiar"
    }).then((result) => {
        if (result.isConfirmed) {
            usuarios = [];  
            localStorage.removeItem("usuarios");
            mostrarUsuarios(); 
            Swal.fire("¡Registros eliminados!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Los registros no fueron eliminados", "", "info");
        }
    });
});


// Simulador de cálculos
document.getElementById("calcularBtn").addEventListener("click", function () {
    const numero1 = parseFloat(document.getElementById("numero1").value);
    const numero2 = parseFloat(document.getElementById("numero2").value);
    const operacion = document.getElementById("operacion").value;

    if (isNaN(numero1) || isNaN(numero2)) {
        Swal.fire("Error en los cálculos", "Por favor, ingresa números válidos.", "error");
        return;
    }

    let resultado;
    if (operacion === "suma") {
        resultado = numero1 + numero2;
    } else if (operacion === "resta") {
        resultado = numero1 - numero2;
    } else if (operacion === "multiplicacion") {
        resultado = numero1 * numero2;
    }

    const resultadoDiv = document.createElement("div");
    resultadoDiv.textContent = `El resultado de la ${operacion} es: ${resultado}`;
    resultadoDiv.style.opacity = 0;
    document.querySelector(".container.mt-4").appendChild(resultadoDiv);

    setTimeout(() => {
        resultadoDiv.style.transition = "opacity 1s ease-in";
        resultadoDiv.style.opacity = 1;
    }, 50);

    Swal.fire("Cálculo realizado", `El resultado es: ${resultado}`, "success");
});

cargarUsuarios();
