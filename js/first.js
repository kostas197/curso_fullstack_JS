// Array de mascotas en adopción
let mascotas = [
    { nombre: "Rocky", tipo: "Perro", edad: 3, descripcion: "Un perro cariñoso" },
    { nombre: "Luna", tipo: "Gato", edad: 2, descripcion: "Una gata dulce y tranquila" },
    { nombre: "adolf", tipo: "Conejo", edad: 1, descripcion: "Un conejo adorable y activo" }
];

//console.log(mascotas.length)

//permite ingresar texto a la lista que se genera en html <li></li>
const listaMascotas = document.getElementById("listaMascotas");

// Función para generar la lista de mascotas
function generarListaMascotas() {
    //listaMascotas.innerHTML = ""; // borra la lista por las dudas

    for (let i = 0; i < mascotas.length; i++) {
        let mascota = mascotas[i];
        const elementoLista = document.createElement("li");
        elementoLista.textContent = `${mascota.nombre} (${mascota.tipo})`;
        elementoLista.onclick = () => seleccionarMascota(i);
        listaMascotas.appendChild(elementoLista);
    }
}

// seleccionar una mascota
function seleccionarMascota(indice) {
    const mascotaSeleccionada = mascotas[indice];

    // Mostrar mensaje de confirmación
    if (confirm(`¿Deseas adoptar a ${mascotaSeleccionada.nombre}?`)) {
        mostrarMascotaSeleccionada(mascotaSeleccionada);
    }
}

// Función para mostrar la información de la mascota seleccionada
function mostrarMascotaSeleccionada(mascota) {
    if (mascota) {
        console.log("Mascota seleccionada:");
        console.log(mascota);

        // Mostrar información en un cuadro de alerta
        alert(`¡Felicidades! Has adoptado a ${mascota.nombre}!`);
    } else {
        alert("No has seleccionado ninguna mascota.");
    }
}

// llama a la funcion, para generar lista al cargar la página
generarListaMascotas();
