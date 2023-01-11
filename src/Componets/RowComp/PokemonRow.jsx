import "./PokemonRow.css";

const PokemonRow = ({ pokemon }) => {
  return (
    <div className="cell">{pokemon != undefined ? pokemon.name : <div />}</div>
  );
};

export default PokemonRow;
