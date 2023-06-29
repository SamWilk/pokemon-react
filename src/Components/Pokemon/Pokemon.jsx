import { useEffect, useState } from "react";
import { PokemonList } from "../PokemonList/PokemonList";
import "./Pokemon.css";
import { RadioGroup, FormControlLabel } from "react-radio-group";

const Pokemon = () => {
  const [pokemonList, SetPokemonList] = useState(new Array());
  const [pokemonGen, SetPokemonGen] = useState(0);
  let genArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    GetPokemon();
  }, []);

  const GetPokemon = async () => {
    if (pokemonGen == 0) {
      const response = await fetch("http://localhost:3000/pokemon");
      const pokemonList = await response.json();
      SetPokemonList(pokemonList);
    } else {
      const response = await fetch("http://localhost:3000/pokemon/gen", {
        method: "get",
        headers: { "Content-Type": "application/json" },
        body: { generation: pokemonGen },
      });
      const pokemonList = await response.json();
      SetPokemonList(pokemonList);
    }
  };

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
          <PokemonList List={pokemonList} />
        ) : (
          <div>Bear with me now...</div>
        )}
      </div>
    </div>
  );
};

export default Pokemon;
