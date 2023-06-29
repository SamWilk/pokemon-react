import { CheckTyping } from "../../logic/CheckTyping.jsx";
import "./PokemonCell.css";

const PokemonCell = ({ pokemon }) => {
  return (
    <div id="zoom" className="cell" onClick={() => {
      console.log(pokemon)
    }}>
      {pokemon == undefined ? (
        <div />
      ) : (
        <span>
          <div className="subHeader">
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
