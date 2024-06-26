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
      //console.log(data); solo usando para debugging
      return data;
    } catch (err) {
      console.error(err);
    }
  }

async function gimeMorePets(){

    let lista_gatos = await gimeSomePets("cats");
    let lista_perros = await gimeSomePets("dogs");

    lista_gatos.forEach(gato => {
        gato.lon = randomAddressForPets("lon");
        gato.lat = randomAddressForPets("lat");
        gato.edad = (Math.random() * 8) +2;
        gato.tipo = "gato"
    });
    lista_perros.forEach(perro => {
        perro.lon = randomAddressForPets("lon");
        perro.lat = randomAddressForPets("lat");
        perro.edad = (Math.random() * 8) +2;
        perro.tipo = "perro"
    });
    const lista_mascotas = lista_gatos.concat(lista_perros);
    localStorage.setItem("lista_mascotas",JSON.stringify(lista_mascotas));
    return lista_mascotas;
    //ploteas pets

    // Borra la lista por las dudas
    //listaMascotas.innerHTML = "";
    // generarListaMascotas(lista_gatos);
    // generarListaMascotas(lista_perros);
}


/*La api no me da ubicaciones por lo que vamos a generar ubicaciones random de los 20 pets
sobre Buenos Aires. Arista en Congreso hacia el norte  y/o este.
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