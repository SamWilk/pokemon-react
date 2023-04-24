import { useEffect, useState } from "react";
import { PokemonList } from "../PokemonList/PokemonList";

const Pokemon = () => {
  useEffect(() => {
    GetPokemon();
  }, []);

  const [pokemonList, SetPokemonList] = useState(new Array());

  const GetPokemon = async () => {
    const response = await fetch("http://localhost:3000/pokemon");
    const pokemonList = await response.json();
    SetPokemonList(pokemonList);
  };

  return (
    <div>
      {pokemonList.length >= 1 ? (
        <PokemonList List={pokemonList} />
      ) : (
        <div>Bear with me now...</div>
      )}
    </div>
  );
};

export default Pokemon;
