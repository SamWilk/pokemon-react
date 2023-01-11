import { useEffect, useState } from "react";
import "./PokemonCell.css";

const PokemonCell = ({ pokemon }) => {
  const [type, setType] = useState([]);

  useEffect(() => {
    FindType();
  }, []);

  const FindType = async () => {
    let tempArray = [];
    if (pokemon != undefined) {
      while (pokemon.types.length != 0) {
        const typeBefore = pokemon.types.pop();
        const url = typeBefore.type.url;
        const response = await fetch(url);
        const body = await response.json();
        tempArray.push(body.name);
      }
      setType(tempArray);
    }
  };

  return (
    <div id="zoom" className="cell">
      {pokemon == undefined ? (
        <div />
      ) : (
        <span>
          <div className="subHeader">
            <div>{pokemon.id}</div>
            <div>{pokemon.name}</div>
          </div>
          <div>
            <img src={pokemon.sprites.front_default} />
          </div>
          <div className="typeRow">
            {type.map((typ, idx) => {
              return <div key={idx}>{typ}</div>;
            })}
          </div>
        </span>
      )}
    </div>
  );
};

export default PokemonCell;
