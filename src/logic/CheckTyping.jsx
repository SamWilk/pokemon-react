import { useState, useEffect } from "react";

/**
 * The component that checks the pokemons type and adds a styles to the sub cell
 * @param {pokemon} param0
 * @returns
 */
export const CheckTyping = ({ pokemon }) => {
  const [type, setType] = useState([]);

  useEffect(() => {
    FindType();
  }, []);

  const FindType = async () => {
    let tempArray = [];
    if (pokemon != undefined && pokemon.types.length > 1) {
      while (pokemon.types.length != 0) {
        const typeBefore = pokemon.types.pop();
        tempArray.push(typeBefore.type.name);
      }
      setType(tempArray);
    }
    if (pokemon != undefined && pokemon.types.length === 1) {
      console.log("Checking for single types");
      console.log("Pokemon Type: ", pokemon);

      const typeBefore = pokemon.types.pop();
      const url = typeBefore.type.url;
      const response = await fetch(url);
      const body = await response.json();
      tempArray.push(body.name);
      setType(tempArray);
    }
  };

  return (
    <div className="typeRow">
      {type.map((types, idx) => {
        return <div key={idx}>{types}</div>;
      })}
    </div>
  );
};
