import "./PokemonCell.css";

const PokemonCell = ({ pokemon }) => {
  if (pokemon == undefined) {
    console.log("Nothing to see here!");
    return <div />;
  }
  return (
    <div id="zoom" className="cell">
      <div className="subHeader">
        <div>{pokemon.id}</div>
        <div>{pokemon.name}</div>
      </div>
      <div>
        <img id="zoom" src={pokemon.sprites.front_default} />
      </div>
    </div>
  );
};

export default PokemonCell;
