async function app(){
/*
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
        */

    if(localStorage.getItem('lista_mascotas')){
        let lista_mascotas = localStorage.getItem('lista_mascotas');
        lista_mascotas = JSON.parse(lista_mascotas);
        generarListaMascotas(lista_mascotas);
        createMap(1,lista_mascotas);
        console.log("old list")
    }
    else {
        newPets()
    }
}

async function newPets(reload){
    
    let lista_mascotas = await gimeMorePets();
    console.log(lista_mascotas);
    generarListaMascotas(lista_mascotas);
    if(reload === 1)createMap(0,lista_mascotas);
    else createMap(1,lista_mascotas)
    console.log("new list")
}





const listaMascotas = document.getElementById("listaMascotas");

function generarListaMascotas(mascotas) {
    
    console.log(mascotas);
    listaMascotas.innerHTML = "";
    mascotas.forEach((mascota) => {
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
        elementoLista.onclick = () => seleccionarMascota(mascota.id);

        // Agregar el elemento de lista a la lista de mascotas
        listaMascotas.appendChild(elementoLista);
        
        
    });
}


// seleccionar una mascota
function seleccionarMascota(indice) {
    console.log(indice);
    const mascotaSeleccionada = indice;

    // Mostrar mensaje de confirmación con SweetAlert
    Swal.fire({
        title: '¿Deseas adoptar a esta mascota?',
        text: `¿Deseas adoptar a ${mascotaSeleccionada}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, adoptar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            solicitarDatosUsuario(mascotaSeleccionada);
        }
    });
}

// Función para mostrar la información de la mascota seleccionada
function mostrarMascotaSeleccionada(mascota) {
    if (mascota) {
        console.log("Mascota seleccionada: " , mascota);

        // Mostrar información en un cuadro de alerta con SweetAlert
        Swal.fire({
            title: '¡Felicidades!',
            text: `¡Has adoptado a ${mascota}!`,
            icon: 'success'
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'No has seleccionado ninguna mascota.',
            icon: 'error'
        });
    }
}

function solicitarDatosUsuario(mascotaSeleccionada) {
    Swal.fire({
        title: 'Ingresa tus datos para retirarme!',
        html: `
            <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
            <input type="number" id="edad" class="swal2-input" placeholder="Edad">
            <select id="horario" class="swal2-input">
                <option value="" disabled selected>Selecciona un horario</option>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
            </select>
        `,
        focusConfirm: false,
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value;
            const edad = Swal.getPopup().querySelector('#edad').value;
            const horario = Swal.getPopup().querySelector('#horario').value;
            if (!nombre || !edad || !horario) {
                Swal.showValidationMessage(`Por favor completa todos los campos`);
            }
            return { nombre: nombre, edad: edad, horario: horario };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const datosUsuario = result.value;
            console.log('Datos del usuario:', datosUsuario);
            // Guardar los datos + mascota
            localStorage.setItem('datosUsuarioAdoptante', JSON.stringify(datosUsuario));
            localStorage.setItem('mascotaSeleccionada', JSON.stringify(mascotaSeleccionada))
            Swal.fire(
                'Datos recibidos',
                `Nombre: ${datosUsuario.nombre}, Edad: ${datosUsuario.edad}, Horario: ${datosUsuario.horario}`,
                'success'
            );
        }
        mostrarMascotaSeleccionada(mascotaSeleccionada);
    });
}

//visualizar los datos del adoptante.
function checkOutMisPatas() {
    datosUsuario = JSON.parse(localStorage.getItem('datosUsuarioAdoptante'));
    datosMascota = JSON.parse(localStorage.getItem('mascotaSeleccionada'));
    if (datosUsuario) {
        Swal.fire({
            title: `Tus datos ya fueron enviados, pasa a retirar a ${datosMascota}` ,
            html: `
                <p><strong>Nombre:</strong> ${datosUsuario.nombre}</p>
                <p><strong>Edad:</strong> ${datosUsuario.edad}</p>
                <p><strong>Horario de Retiro:</strong> ${datosUsuario.horario}</p>
            `,
            icon: 'info'
        });
    } else {
        Swal.fire({
		title: 'Sin Datos :(',
            text: 'No hay datos guardados en el localstorage. Mira alguna de nuestras mascotas y adopta una!',
            icon: 'error'
        });
    }
}


//funcion principal
app()
