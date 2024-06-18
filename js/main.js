async function app(){

    class Mascota {
        constructor(nombre, tipo, url) {
            this.nombre = nombre; // el nombre lo vamos a convertir en un id
            this.tipo = tipo; //cat o dog
            this.url = url; 
            this.latitud = randomAddressForPets("lat")
            this.longuitud = randomAddressForPets("lon")
        }
    }

    class Usuario {
        constructor(nombre, edad, direccion){
            this.nombre = nombre;
            this.edad =edad;
            this.direccion = direccion;
        }
    }

    if(localStorage.getItem('lista_mascotas')){
        let listaMascotas = localStorage.getItem('lista_mascotas');
        generarListaMascotas(JSON.parse(listaMascotas));
        console.log("aca")
    }
    else {
        gimeMorePets();
    }
}






const listaMascotas = document.getElementById("listaMascotas");

function generarListaMascotas(mascotas) {
    
    console.log(mascotas);
    mascotas.forEach((mascota, id) => {
        //console.log(mascota);
        const elementoLista = document.createElement("li");
        elementoLista.className = "list-group-item";

        // Crear la imagen de la mascota
        const imagenMascota = document.createElement("img");
        imagenMascota.src = mascota.url;
        imagenMascota.className = "img-fluid m-2";
        imagenMascota.alt = mascota.id;
        imagenMascota.style.width = "200px";
        imagenMascota.style.borderRadius = "20%";

        // Crear el contenido de texto con el nombre y tipo de mascota
        const contenidoTexto = document.createElement("span");
        // contenidoTexto.textContent = `${mascota.id} (${mascota.tipo})`;
        contenidoTexto.textContent = `${mascota.id}`;

        // Agregar la imagen y el contenido de texto al elemento de la lista
        elementoLista.appendChild(imagenMascota);
        elementoLista.appendChild(contenidoTexto);

        // Manejar el evento click para seleccionar la mascota
        elementoLista.onclick = () => seleccionarMascota(id, mascotas);

        // Agregar el elemento de lista a la lista de mascotas
        listaMascotas.appendChild(elementoLista);
	    //plot map
	if(mastoca.tipo === 'perro')
        L.marker([mascota.lat, mascota.lon], {icon: perroIcon}).bindPopup(mascota.id).addTo(map);
	if(mascota.tipo === 'gato')
        L.marker([mascota.lat, mascota.lon], {icon: gatoIcon}).bindPopup(mascota.id).addTo(map);
	else
        L.marker([mascota.lat, mascota.lon]).bindPopup(mascota.id).addTo(map);
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

//funcion principal
app()
