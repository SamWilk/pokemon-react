import { useEffect, useState } from "react";
import "./App.css";
import PokemonRow from "./Componets/RowComp/PokemonRow.jsx";

function App() {
  const [pokeapi, setPokeapi] = useState(new Array(undefined));

  useEffect(() => {
    FindPok();
  }, []);

  const FindPok = async () => {
    let temp = [];
    for (let i = 1; i < 100; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const body = await res.json();
      temp.push(body);
    }
    setPokeapi(temp);
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
