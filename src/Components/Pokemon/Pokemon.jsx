import { useEffect, useState } from "react";
import { PokemonList } from "../PokemonList/PokemonList";
import "./Pokemon.css";
import { getMyAPIUrl } from "../../configURL";
import { useCookies } from "react-cookie";
import Logout from "../Logout/Logout";
import Greetings from "../Greeting/Greeting";
import Blastoise from "../../Images/blastoise.png";

const Pokemon = () => {
  const [pokemonList, SetPokemonList] = useState(new Array());
  const [pokemonGen, SetPokemonGen] = useState(0);
  const [selectedPokemon, SetSelectedPokemon] = useState(new Array());
  const [cookies] = useCookies(["Bearer"]);

  let genArray = [1, 2, 3, 4, 5, 6, 7];
  const APIUrl = getMyAPIUrl();

  useEffect(() => {
    GetPokemon();
  }, [pokemonGen]);

  const GetPokemon = async () => {
    if (pokemonGen == 0) {
      // Intial Get
      const defaultResponse = await fetch(`${APIUrl}/pokemon`);
      const pokemonList = await defaultResponse.json();

      //User Specific Get
      const userResponse = await fetch(`${APIUrl}/users/pokemon`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.Bearer}`,
        },
      });
      const userPokemonList = await userResponse.json();
      pokemonList.map((e) => {
        e["Selected"] = false;
        userPokemonList.map((p) => {
          if (p.pokemonid == e.id) e["Selected"] = true;
        });
      });
      SetPokemonList(pokemonList);
    } else {
      const response = await fetch(`${APIUrl}/pokemon/gen/${pokemonGen}`);
      const pokemonList = await response.json();

      //User Specific Get
      const userResponse = await fetch(`${APIUrl}/users/pokemon`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.Bearer}`,
        },
      });
      const userPokemonList = await userResponse.json();
      pokemonList.map((e) => {
        e["Selected"] = false;
        userPokemonList.map((p) => {
          if (p.pokemonid == e.id) e["Selected"] = true;
        });
      });
      SetPokemonList(pokemonList);
    }
  };

  // Make call to get selected pokemon

  const GenFilter = async (gen) => {
    SetPokemonGen(gen);
  };

  return (
    <div className='ListHolder'>
      <div className='SideColumn'>
        {/* <GenFilter /> */}
        <div className='Side-Top'>
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
                  value={`Generation ${gen}`}
                  onClick={async () => {
                    await GenFilter(gen);
                  }}
                />
              );
            })}
          </div>
          <Greetings />
        </div>
        <div className='Side-Bottom'>
          <Logout />
        </div>
      </div>
      <div className='ListHolder'>
        {pokemonList.length >= 1 ? (
          <PokemonList List={pokemonList} Generation={pokemonGen} />
        ) : (
          <div className='LoadingScreen'>
            <img
              className='loadingImage'
              src={Blastoise}
              alt='Blastoise'
              height={300}
              width={300}
            />
            <h1>I'm working on it!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokemon;
