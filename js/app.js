//SEGUNDA PRE-ENTREGA JS60000 SOLER GONZALO, CODERHOUSE
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
    });
}

document.getElementById("registrarBtn").addEventListener("click", function() {
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const email = document.getElementById("email").value;

    if (!nombre || !edad || !email) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let usuario = {
        nombre: nombre,
        edad: parseInt(edad),
        email: email
    };

    usuarios.push(usuario);
    guardarUsuarios();
    mostrarUsuarios();
    document.getElementById("registroForm").reset(); 
});

document.getElementById("limpiarBtn").addEventListener("click", function() {
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

document.getElementById("calcularBtn").addEventListener("click", function() {
    const numero1 = parseFloat(document.getElementById("numero1").value);
    const numero2 = parseFloat(document.getElementById("numero2").value);
    const operacion = document.getElementById("operacion").value;

    if (isNaN(numero1) || isNaN(numero2)) {
        alert("Por favor, ingresa números válidos.");
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

    alert("El resultado de la " + operacion + " es: " + resultado);
});

cargarUsuarios();
