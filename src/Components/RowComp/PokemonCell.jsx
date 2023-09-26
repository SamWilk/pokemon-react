import { CheckTyping } from "../../logic/CheckTyping.jsx";
import "./PokemonCell.css";
import { getMyAPIUrl } from "../../configURL.js";
import { useCookies } from "react-cookie";
import React from "react";

const PokemonCell = ({ pokemon }) => {
  let className = "cell";
  const APIUrl = getMyAPIUrl();
  const [cookies] = useCookies(["Bearer"]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  if (pokemon.Selected === true) {
    className = "cell-selected";
  }

  const updatePokemon = async (pokemon) => {
    try {
      const response = await fetch(`${APIUrl}/users/pokemon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.Bearer}`,
        },
        body: JSON.stringify({ pokemonid: pokemon.id }),
      });
      console.log(response);
      if (response.status == "202") {
        pokemon.Selected = false;
      } else {
        pokemon.Selected = true;
      }
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='zoom' className={className} onClick={() => updatePokemon(pokemon)}>
      {pokemon == undefined ? (
        <div />
      ) : (
        <span>
          <div className='subHeader'>
            <div>{pokemon.id}</div>
            <div>{pokemon.name}</div>
          </div>
          <div>
            <img src={pokemon.sprite} />
          </div>
          <CheckTyping pokemon={pokemon} />
        </span>
      )}
    </div>
  );
};

export default PokemonCell;
