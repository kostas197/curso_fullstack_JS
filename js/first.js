class Mascota {
    constructor(nombre, tipo, edad, url_foto, descripcion) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.edad = edad;
        this.foto = url_foto;
        this.descripcion = descripcion;
    }
}

class Perro extends Mascota {
    constructor(nombre, edad, url_foto, descripcion) {
        super(nombre, "Perro" , edad, url_foto,descripcion);
    }
}

class Gato extends Mascota {
    constructor(nombre, edad, url_foto, descripcion) {
        super(nombre, "Gato", edad, url_foto, descripcion);
    }
}

class Conejo extends Mascota {
    constructor(nombre, edad, url_foto, descripcion) {
        super(nombre, "Conejo", edad, url_foto,descripcion);
    }
}

// Array de mascotas en adopción
let mascotas = [
    new Perro("Rocky", 3, "assets/imgs/perro0.jpg", "Un perro cariñoso"),
    new Gato("Luna", 2, "assets/imgs/gato0.jpg", "Una gata dulce y tranquila"),
    new Conejo("adolf", 1, "assets/imgs/conejo0.jpg", "Un conejo adorable y activo")
];

const listaMascotas = document.getElementById("listaMascotas");

// Función para generar la lista de mascotas
function generarListaMascotas() {
    // Borra la lista por las dudas
    listaMascotas.innerHTML = "";

    mascotas.forEach((mascota, indice) => {
        const elementoLista = document.createElement("li");
        elementoLista.className = "list-group-item";
        
        // Crear la imagen de la mascota
        const imagenMascota = document.createElement("img");
        imagenMascota.src = mascota.foto;
        imagenMascota.className = "img-fluid m-4";
        imagenMascota.alt = `${mascota.nombre}`;
        imagenMascota.style.width = "150px";
        imagenMascota.style.borderRadius = "20%";
        
        // Crear el contenido de texto con el nombre y tipo de mascota
        const contenidoTexto = document.createElement("span");
        contenidoTexto.textContent = `${mascota.nombre} (${mascota.tipo})`;
        
        // Agregar la imagen y el contenido de texto al elemento de la lista
        elementoLista.appendChild(imagenMascota);
        elementoLista.appendChild(contenidoTexto);
        
        // Manejar el evento click para seleccionar la mascota
        elementoLista.onclick = () => seleccionarMascota(indice);
        
        // Agregar el elemento de lista a la lista de mascotas
        listaMascotas.appendChild(elementoLista);
    });
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
