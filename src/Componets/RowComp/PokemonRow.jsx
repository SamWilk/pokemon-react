import "./PokemonRow.css";

const PokemonRow = ({ pokemon }) => {
  return (
    <div className="cell">
      {pokemon != undefined ? pokemon.species.name : ""}
    </div>
  );
};

export default PokemonRow;
