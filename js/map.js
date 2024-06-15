function createMap() {
    // Replace with your desired map container ID
    const mapContainerId = 'map';
    const map = L.map(mapContainerId).setView([-34.60994, -58.39261], 14);
  
    // Add a base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Add markers, popups, or other elements as needed
    L.marker([-34.60994, -58.39261]).addTo(map)
      .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
      .openPopup();
  }
  
  // Call the createMap function when the DOM is ready
  document.addEventListener('DOMContentLoaded', createMap);