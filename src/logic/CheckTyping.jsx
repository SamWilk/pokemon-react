import { useState, useEffect } from "react";
import { PokemonType } from "../Components/PokemonType";
import "./CheckTyping.css";

/**
 * The component that checks the pokemons type and adds a styles to the sub cell
 * @param {pokemon} param0
 * @returns
 */
export const CheckTyping = ({ pokemon }) => {
  const [type, setType] = useState([]);
  const [colorStyle, setColorStyle] = useState("");

  useEffect(() => {
    FindType();
  }, []);

  const FindType = async () => {
    let tempArray = [];
    if (pokemon != undefined && pokemon.types.length > 1) {
      while (pokemon.types.length != 0) {
        const typeBefore = pokemon.types.pop();
        tempArray.push(typeBefore.type.name);
        SetColor(typeBefore.type.name);
      }
      setType(tempArray);
    }
    if (pokemon != undefined && pokemon.types.length === 1) {
      const typeBefore = pokemon.types.pop();
      const url = typeBefore.type.url;
      const response = await fetch(url);
      const body = await response.json();
      tempArray.push(body.name);
      setType(tempArray);
      SetColor(body.name);
    }
  };

  const SetColor = (typing) => {
    const lowerType = typing.toLowerCase();
    switch (lowerType) {
      case "fire":
        setColorStyle("fire");
        break;
      case "flying":
        setColorStyle("flying");
        break;
      default:
        break;
    }
  };

  return (
    <div className="typeRow">
      {type.map((types, idx) => {
        return <PokemonType PokemonType={types} key={idx} />;
      })}
    </div>
  );
};
