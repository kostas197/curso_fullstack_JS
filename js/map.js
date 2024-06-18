function createMap(create,lista_mascotas) {
        // Definir un nuevo icono con una imagen personalizada
        let gatoIcon = L.icon({
          iconUrl: 'assets/imgs/logo.png', // URL de la imagen del icono
          iconSize: [38, 38], // Tamaño del icono
          iconAnchor: [19, 38], // Punto del icono que se corresponderá con la ubicación del marcador
          popupAnchor: [0, -38] // Punto desde el cual se abrirá el popup en relación al icono
          });
          let perroIcon = L.icon({
            iconUrl: 'assets/imgs/logo.png', // URL de la imagen del icono
            iconSize: [38, 38], // Tamaño del icono
            iconAnchor: [19, 38], // Punto del icono que se corresponderá con la ubicación del marcador
            popupAnchor: [0, -38] // Punto desde el cual se abrirá el popup en relación al icono
            });
  if(create){
    // Replace with your desired map container ID
    const mapContainerId = 'map';
    const map = L.map(mapContainerId).setView([-34.60994, -58.39261], 14);
  
    // Add a base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Add markers, popups, or other elements as needed
    // L.marker([-34.60994, -58.39261]).addTo(map)
    //   .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
    //   .openPopup();



      markersLayer = L.layerGroup().addTo(map);
    }
    if(lista_mascotas){
      markersLayer.clearLayers();
      lista_mascotas.forEach(mascota => {
       if(mascota.tipo === "gato")L.marker([mascota.lat, mascota.lon], { icon: perroIcon }).addTo(markersLayer).bindPopup(mascota.id).openPopup();
      else if(mascota.tipo === "perro")L.marker([mascota.lat, mascota.lon], { icon: gatoIcon }).addTo(markersLayer).bindPopup(mascota.id).openPopup();
      else L.marker([mascota.lat, mascota.lon]).addTo(map).bindPopup(mascota.id).openPopup();
        });
      }
  }
  //let markers = L.layerGroup().addTo(map);
  // Call the createMap function when the DOM is ready
  //document.addEventListener('DOMContentLoaded', createMap);