import { CheckTyping } from "../../logic/CheckTyping.jsx";
import "./PokemonCell.css";

const PokemonCell = ({ pokemon }) => {
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
          <CheckTyping pokemon={pokemon} />
        </span>
      )}
    </div>
  );
};

export default PokemonCell;
