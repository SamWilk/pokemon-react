import { useState, useEffect } from "react";
import { PokemonType } from "../Components/PokemonType/PokemonType";
import "./CheckTyping.css";

/**
 * The component that checks the pokemons type and adds a styles to the sub cell
 * @param {pokemon} param0
 * @returns
 */
export const CheckTyping = ({ pokemon }) => {
  return (
    <div className="typeRow">
      {pokemon.types.map((type, idx) => {
        return <PokemonType PokemonType={type} key={idx} />;
      })}
    </div>
  );
};
