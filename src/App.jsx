import { useEffect, useState } from "react";
import "./App.css";
import PokemonRow from "./Componets/RowComp/PokemonRow.jsx";

function App() {
  const [pokeapi, setPokeapi] = useState(new Array(undefined));
  const [loadingFlag, setLoadingFlag] = useState(true);

  useEffect(() => {
    FindPok();
    console.log(pokeapi);
  }, []);

  const FindPok = async () => {
    let temp = [];
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`);
    const body = await res.json();
    for (let i = 1; i < body.results.length + 1; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const body = await res.json();
      temp.push(body);
    }
    setPokeapi(temp);
  };

  return (
    <div className="App">
      <div>Pokemon Tracker App</div>
      <div className="PokeContainer">
        {pokeapi.map((poke, idx) => {
          return <PokemonRow pokemon={poke} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default App;
