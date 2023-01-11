import { useEffect, useState } from "react";
import "./App.css";
import PokemonRow from "./Componets/RowComp/PokemonRow.jsx";

function App() {
  const [pokeapi, setPokeapi] = useState(new Array(undefined));
  const [loadingFlag, setLoadingFlag] = useState(true);

  useEffect(() => {
    FindPok();
  }, []);

  const FindPok = async () => {
    let temp = [];
    for (let i = 1; i < 600; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const body = await res.json();
      temp.push(body);
    }
    setPokeapi(temp);
  };

  return (
    <div className="App">
      <div>Pokemon Tracker App</div>
      {loadingFlag == true ? (
        <div>Loading...</div>
      ) : (
        <div>
          {pokeapi.map((poke, idx) => {
            return <PokemonRow pokemon={poke} key={idx} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
