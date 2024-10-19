//Sets up an object that holds all the pokemon types with their corresponding colours.

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

//Function responsible for displaying the Pokemon details

function displayPokemonData(pokemon) {
  const typesContainer = document.getElementById("types");
  typesContainer.innerHTML = "";

//Display pokemon details by taking information from API and rendering it on the page after the user makes a search.

document.getElementById("pokemon-name").innerText = pokemon.name.toUpperCase();
document.getElementById("pokemon-id").innerText = `#${pokemon.id}`;


//Loop to assign background colour to each pokemon type
pokemon.types.forEach(typeInfo => {
  const typeName = typeInfo.type.name;
  const typeElement = document.createElement("p");
  typeElement.innerText = typeName.toUpperCase();
  typeElement.style.backgroundColor = typeColors[typeName];
  typesContainer.appendChild(typeElement);
});



document.getElementById("weight").innerText = `Weight: ${pokemon.weight}`;
document.getElementById("height").innerText = `Height: ${pokemon.height}`;
document.getElementById("hp").innerText = `HP: ${pokemon.stats[0].base_stat}`;
document.getElementById("attack").innerText = `Attack: ${pokemon.stats[1].base_stat}`;
document.getElementById("defense").innerText = `Defense: ${pokemon.stats[2].base_stat}`;
document.getElementById("special-attack").innerText = `Special Attack: ${pokemon.stats[3].base_stat}`;
document.getElementById("special-defense").innerText = `Special Defense: ${pokemon.stats[4].base_stat}`;
document.getElementById("speed").innerText = `Speed: ${pokemon.stats[5].base_stat}`;

//Target container for Pokemon image and display the queried Pokemon Sprite

const spriteContainer = document.getElementById("pokemon-sprite");
spriteContainer.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;

//Set the background of the app to the primary type of a Pokemon (Some pokemon have more than 1 type so the second colour is ignored!)

const primaryType = pokemon.types[0].type.name;
document.body.style.backgroundColor = typeColors[primaryType];
}

//Display data about searched Pokemon after search with a pokeball loading animation

function searchAndDisplayPokemon(searchInput) {
  const pokeball = document.getElementById("pokeball");
  const pokemonData = document.getElementById("pokemon-data");


pokeball.style.display = "block";
pokemonData.style.display = "none";

//Fetch the Pokemon data from the PokeAPI and add the searched input to the end of the API's URL to gather info about the searched Pokemon

fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`)
.then(response => {
  if (!response.ok) {
    alert("Pokemon not found!");
    throw new Error("Pokemon not found!");
  }
  return response.json();
})
.then(data => {
  setTimeout(() => {
    pokeball.style.display = "none";
    pokemonData.style.display = "block";
    displayPokemonData(data);
  }, 500);
})
.catch(error => console.error(error));
}


//This code adds event listeners to the search button and input so when the search button is clicked, the value of 
//The search input is used as the argument in the searchAndDisplayPokemon function.

document.getElementById("search-button").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  
  if (searchInput) {
    searchAndDisplayPokemon(searchInput);
  }
})

//Additional event listener so you can click Enter to make a search

document.getElementById("search-input").addEventListener("keydown", (event) => {
if (event.key === "Enter") {
  const searchInput = event.target.value.toLowerCase();

  if (searchInput) {
    searchAndDisplayPokemon(searchInput);
  }
}  
})

//Hides pokemon information initially on app load.

window.onload = function() {
  document.getElementById("pokemon-data").style.display = "none";
  document.getElementById("pokeball").style.display = "none";
}