function app(){
	//code for debug my little app on android webbrowser (developer-tools).
	(function() {
		var script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/eruda';
		document.body.appendChild(script);
		script.onload = function() {
			eruda.init();
		};
	})();
    //fin codigo developer tools
	
    let lista_gatos = [];
    let lista_perros = [];
    class Mascota {
        constructor(nombre, tipo, url_foto) {
            this.nombre = nombre; // el nombre lo vamos a convertir en un id
            this.tipo = tipo; //cat o dog
            this.edad = (Math.random() * 8) +2; //ramdon de edad tambien
            this.url_foto = url_foto; 
            this.latitud = randomAddressForPets("lat")
            this.longuitud = randomAddressForPets("lon")
        }
    }
    class Perro extends Mascota {
        constructor(nombre, url_foto) {
            super(nombre, "Perro", url_foto);
        }
    }
    
    class Gato extends Mascota {
        constructor(nombre, url_foto) {
            super(nombre, "Gato", url_foto);
        }
    }


  lista_gatos = gimeSomePets("cats")
  .then(cats => {
    //console.log(cats[0].url)
    cats.forEach(cat => {
        lista_gatos.push(new Gato(cat.id,cat.url))
    })
    console.log(lista_gatos);
    return lista_gatos;
  })
  .catch(error => console.error(error));
  
  lista_perros = gimeSomePets("dogs")
  .then(dogs => {
    //console.log(cats[0].url)
    dogs.forEach(dog => {
        lista_perros.push(new Perro(dog.id,dog.url))
    })
    console.log(lista_perros);
    return lista_perros;
  })
  .catch(error => console.error(error));

generarListaMascotas(lista_gatos);
}

//función - promesa para hacer fetch de datos desde las apis.
async function gimeSomePets(select_pets) {
    let url;
    if (select_pets === "cats") {
        url = "https://api.thecatapi.com/v1/images/search?limit=10";
    } else if (select_pets === "dogs") {
        url = "https://api.thedogapi.com/v1/images/search?limit=10";
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      //console.log(data); //solo usando para debugging
      return data;
    } catch (err) {
      console.error(err);
    }
}


/*La api no me da ubicaciones por lo que vamos a generar ubicaciones random de los 20 pets
sobre Buenos Aires. Arista en Congreso hacia el norte y este.
-34.60980096248984, -58.39190765569035.
*/
function randomAddressForPets(LattitudOLonguitud){
    let LattitudBorder = -34.609801;
    let LonguitudBorder = -58.391907;

    //LattitudOLonguitud.tolowercase();

    if(LattitudOLonguitud === 'lat')
        return Math.random()/100 + LattitudBorder;
    else if(LattitudOLonguitud === 'lon')
        return Math.random()/100 + LonguitudBorder;
    else 
    return null;
}




//const listaMascotas = document.getElementById("listaMascotas");

function generarListaMascotas(mascotas) {
    // Borra la lista por las dudas
    listaMascotas.innerHTML = "";

	console.log(mascotas);
    mascotas.forEach((mascota, indice) => {
        const elementoLista = document.createElement("li");
        elementoLista.className = "list-group-item";

        // Crear la imagen de la mascota
        const imagenMascota = document.createElement("img");
        imagenMascota.src = mascota.url_foto;
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
        elementoLista.onclick = () => seleccionarMascota(indice, mascotas);

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

//funcion principal
app()
