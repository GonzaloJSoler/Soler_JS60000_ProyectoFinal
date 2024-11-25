//SEGUNDA PRE-ENTREGA JS60000 SOLER GONZALO, CODERHOUSE
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
});

let usuarios = [];

function cargarUsuariosDesdeJSON() {
    fetch("data/usuarios.json") 
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then((data) => {
            usuarios = data; 
            guardarUsuarios();
            mostrarUsuarios(); 
        })
        .catch((error) => {
            console.error("Error al cargar los datos desde JSON:", error);
            Swal.fire("Error", "No se pudieron cargar los datos del JSON.", "error");
        });
}

function cargarUsuarios() {
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (usuariosGuardados) {
        usuarios = JSON.parse(usuariosGuardados);
        mostrarUsuarios();
    } else {
        cargarUsuariosDesdeJSON();
    }
}

function guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrarUsuarios() {
    const contenedor = document.getElementById("listaUsuarios");
    contenedor.innerHTML = ""; 

    if (usuarios.length === 0) {
        contenedor.innerHTML = "<tr><td colspan='5'>No hay usuarios registrados.</td></tr>";
        return;
    }

    usuarios.forEach((usuario, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.edad}</td>
            <td>${usuario.email}</td>
            <td>
                <button class="btn-editar" data-index="${index}">Editar</button>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </td>
        `;
        contenedor.appendChild(fila);
    });

    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", eliminarUsuario);
    });

    const botonesEditar = document.querySelectorAll(".btn-editar");
    botonesEditar.forEach((boton) => {
        boton.addEventListener("click", editarUsuario);
    });
}

function editarUsuario(event) {
    const index = event.target.getAttribute("data-index"); 
    const usuario = usuarios[index];

    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("edad").value = usuario.edad;
    document.getElementById("email").value = usuario.email;

    document.getElementById("registrarBtn").textContent = "Actualizar";

    document.getElementById("registrarBtn").addEventListener("click", function actualizarUsuario() {
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

        usuarios[index] = { nombre, edad: parseInt(edad), email };
        guardarUsuarios();
        mostrarUsuarios();

        document.getElementById("registroForm").reset();
        document.getElementById("registrarBtn").textContent = "Registrar"; 

        Swal.fire("¡Usuario actualizado!", "La información del usuario se ha actualizado correctamente.", "success");

        document.getElementById("registrarBtn").removeEventListener("click", actualizarUsuario);
    });
}

function eliminarUsuario(event) {
    const index = event.target.getAttribute("data-index");
    if (index === null || index < 0 || index >= usuarios.length) {
        Swal.fire("Error", "No se pudo encontrar al usuario.", "error");
        return;
    }
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            usuarios.splice(index, 1);
            guardarUsuarios();
            mostrarUsuarios();
            Swal.fire("Eliminado", "El usuario fue eliminado.", "success");
        }
    });
}

document.getElementById("registrarBtn").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const email = document.getElementById("email").value.trim();
    const errores = [];

    const emailExistente = usuarios.some(usuario => usuario.email === email);
    if (emailExistente) {
        errores.push("Este email ya está registrado.");
    }

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
    Swal.fire({
        title: `¡Bienvenido, ${nombre}!`,
        text: "El usuario se registró correctamente.",
        icon: "success"
    });
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

document.getElementById("calcularBtn").addEventListener("click", function () {
    const numero1 = parseFloat(document.getElementById("numero1").value);
    const numero2 = parseFloat(document.getElementById("numero2").value);
    const operacion = document.getElementById("operacion").value;

    if (isNaN(numero1)) {
        Swal.fire("Error en los cálculos", "Por favor, ingresa un número válido para el primer número.", "error");
        return;
    }

    let resultado;

    switch (operacion) {
        case "suma":
            resultado = numero1 + numero2;
            break;
        case "resta":
            resultado = numero1 - numero2;
            break;
        case "multiplicacion":
            resultado = numero1 * numero2;
            break;
        case "division":
            if (numero2 === 0) {
                Swal.fire("Error", "No se puede dividir por cero.", "error");
                return;
            }
            resultado = numero1 / numero2;
            break;
        case "potenciacion":
            resultado = Math.pow(numero1, numero2); 
            break;
        case "raiz":
            if (numero1 < 0) {
                Swal.fire("Error", "No se puede calcular la raíz cuadrada de un número negativo.", "error");
                return;
            }
            resultado = Math.sqrt(numero1); 
            break;
        case "porcentaje":
            resultado = (numero1 * numero2) / 100; 
            break;
        default:
            Swal.fire("Error", "Operación no válida.", "error");
            return;
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


cargarUsuariosDesdeJSON();
cargarUsuarios();