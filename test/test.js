async function gimeSomePets(select_pets) {
    let url;
    if (select_pets === "cats") {
      url = "https://api.thecatapi.com/v1/images/search?limit=10";
    } else if (select_pets === "dogs") {
      url = "https://api.thedogapi.com/v1/images/search?limit=10"; // Replace with dog API URL
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      //console.log(data);
      return data; // Return the fetched data
    } catch (err) {
      console.error(err);
    }
  }
  
  async function test() {
    let cats = await gimeSomePets("cats"); // Call and store the returned data
    console.log(cats); // Access the data outside the function
    let dogs = await gimeSomePets("dogs");
    console.log(dogs);

  }
  
  test();


  