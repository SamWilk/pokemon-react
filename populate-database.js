import axios from "axios";
import Pool from "pg-pool";

// Configure the PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pokemon-react",
  password: "test",
  port: 8080,
});

async function fetchPokemonData() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const pokemonList = [];

  for (let i = 0; i <= 1025; i++) {
    try {
      const response = await axios.get(`${baseUrl}${i}`);
      const transformedPokemon = transformPokemonData(response.data);
      pokemonList.push(transformedPokemon);

      if (i % 25 === 0 || i === 1) {
        console.log(transformedPokemon);
      }

      await insertPokemon(transformedPokemon);
    } catch (error) {
      console.error(`Error fetching Pokémon ${i}:`, error.message);
    }
  }

  console.log(`Fetched ${pokemonList.length} Pokémon.`);
  return pokemonList;
}

function transformPokemonData(data) {
  const generationBoundaries = [
    { min: 1, max: 151, generation: 1 },
    { min: 152, max: 251, generation: 2 },
    { min: 252, max: 386, generation: 3 },
    { min: 387, max: 493, generation: 4 },
    { min: 494, max: 649, generation: 5 },
    { min: 650, max: 721, generation: 6 },
    { min: 722, max: 809, generation: 7 },
    { min: 810, max: 905, generation: 8 },
    { min: 906, max: 1025, generation: 9 },
  ];

  // Find the generation based on the ID
  const generation =
    generationBoundaries.find(
      (boundary) => data.id >= boundary.min && data.id <= boundary.max
    )?.generation || 1; // Default to generation 1 if not found

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default || "",
    types: data.types.map((typeEntry) => typeEntry.type.name),
    generation: generation,
  };
}

async function insertPokemon(pokemon) {
  const query = `
    INSERT INTO pokemon (id, name, sprite, types, generation)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (id) DO NOTHING
  `;

  try {
    const typesArray = `{${pokemon.types.join(",")}}`; // Convert array to PostgreSQL format
    await pool.query(query, [
      pokemon.id,
      pokemon.name,
      pokemon.sprite,
      typesArray,
      pokemon.generation,
    ]);
  } catch (error) {
    console.error(`Error inserting Pokémon ${pokemon.id}:`, error.message);
  }
}

fetchPokemonData()
  .then(() => {
    console.log("All Pokémon data fetched and stored successfully.");
  })
  .catch((err) => {
    console.error("An error occurred while fetching Pokémon data:", err);
  });
