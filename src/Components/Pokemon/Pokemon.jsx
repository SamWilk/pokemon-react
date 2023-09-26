import { useEffect, useState } from "react";
import { PokemonList } from "../PokemonList/PokemonList";
import "./Pokemon.css";
import { getMyAPIUrl } from "../../configURL";

const Pokemon = () => {
  const [pokemonList, SetPokemonList] = useState(new Array());
  const [pokemonGen, SetPokemonGen] = useState(0);
  const [selectedPokemon, SetSelectedPokemon] = useState(new Array());
  let genArray = [1, 2, 3, 4, 5, 6, 7];
  const APIUrl = getMyAPIUrl();

  useEffect(() => {
    GetPokemon();
    // Make call to get selected pokemon
    GetSelectedPokemon();
  }, [pokemonGen]);

  const GetSelectedPokemon = () => {};

  const GetPokemon = async () => {
    if (pokemonGen == 0) {
      const response = await fetch(`${APIUrl}/pokemon`);
      const pokemonList = await response.json();
      pokemonList.map((e) => {
        e["Selected"] = false;
      });
      SetPokemonList(pokemonList);
    } else {
      const response = await fetch(`${APIUrl}/pokemon/gen/${pokemonGen}`);
      const pokemonList = await response.json();
      pokemonList.map((e) => {
        e["Selected"] = false;
      });
      SetPokemonList(pokemonList);
    }
  };

  // Make call to get selected pokemon

  const GenFilter = async (gen) => {
    SetPokemonGen(gen);
    console.log(gen);
  };

  return (
    <div className='ListHolder'>
      <div className='SideColumn'>
        {/* <GenFilter /> */}
        <h4>Choose the Generation</h4>
        <div className='GenContainer'>
          <input
            className='GenButton'
            type='button'
            value={`All Gen`}
            onClick={async () => {
              await GenFilter(0);
            }}
          />
          {genArray.map((gen) => {
            return (
              <input
                className='GenButton'
                key={gen}
                type='button'
                value={`Gen ${gen}`}
                onClick={async () => {
                  await GenFilter(gen);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className='ListHolder'>
        {pokemonList.length >= 1 ? (
          <PokemonList List={pokemonList} SelectedList={selectedPokemon} />
        ) : (
          <div>Bear with me now...</div>
        )}
      </div>
    </div>
  );
};

export default Pokemon;
