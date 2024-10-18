// Type colors mapping
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
  };
  
  // Function to display Pokémon details
  function displayPokemonData(pokemon) {
    // Clear previous type elements
    const typesContainer = document.getElementById('types');
    typesContainer.innerHTML = '';
  
    // Display Pokémon name, id, stats, etc...
    document.getElementById('pokemon-name').innerText = pokemon.name.toUpperCase();
    document.getElementById('pokemon-id').innerText = `#${pokemon.id}`;
    document.getElementById('weight').innerText = `Weight: ${pokemon.weight}`;
    document.getElementById('height').innerText = `Height: ${pokemon.height}`;
    document.getElementById('hp').innerText = `HP: ${pokemon.stats[0].base_stat}`;
    document.getElementById('attack').innerText = `Attack: ${pokemon.stats[1].base_stat}`;
    document.getElementById('defense').innerText = `Defense: ${pokemon.stats[2].base_stat}`;
    document.getElementById('special-attack').innerText = `Special Attack: ${pokemon.stats[3].base_stat}`;
    document.getElementById('special-defense').innerText = `Special Defense: ${pokemon.stats[4].base_stat}`;
    document.getElementById('speed').innerText = `Speed: ${pokemon.stats[5].base_stat}`;
  
    // Show Pokémon sprite
    const spriteContainer = document.getElementById('pokemon-sprite');
    spriteContainer.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;
  
    // Display each type with its respective color
    pokemon.types.forEach(typeInfo => {
      const typeName = typeInfo.type.name;
      const typeElement = document.createElement('p');
      typeElement.innerText = typeName.toUpperCase();
      typeElement.style.backgroundColor = typeColors[typeName];
      typesContainer.appendChild(typeElement);
    });

    // Change background color based on the primary type
    const primaryType = pokemon.types[0].type.name;
    document.body.style.backgroundColor = typeColors[primaryType];
  }
  
  // Fetch and search function
  document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`)
      .then(response => {
        if (!response.ok) {
          alert('Pokémon not found');
          throw new Error('Pokémon not found');
        }
        return response.json();
      })
      .then(data => {
        displayPokemonData(data);
      })
      .catch(error => console.error(error));
  });