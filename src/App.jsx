import { useEffect, useState } from "react";
import "./App.css";
import PokemonRow from "./Componets/PokemonRow";

function App() {
  const [count, setCount] = useState(0);
  const [pokeapi, setPokeapi] = useState(new Array());

  useEffect(() => {
    GetPoke();
  }, []);

  const GetPoke = async () => {
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=154");
    const pokeBody = await pokemon.json();
    setPokeapi(pokeBody.results);
  };

  return (
    <div className="App">
      <div>Pokemon Tracker App</div>
      <div>
        {pokeapi.map((poke, idx) => {
          return <PokemonRow pokemon={poke} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default App;
