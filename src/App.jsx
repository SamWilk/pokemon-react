import { useEffect, useState } from "react";
import "./App.css";
import PokemonCell from "./Components/RowComp/PokemonCell.jsx";

/*
 * Construct a pokemon object to pass around in the application rather than work with requests
 * all the time.
 * Call once load times are down and less api calls
 */

function App() {
  const [pokeapi, setPokeapi] = useState(new Array());
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Before");
    console.log(pokeapi);
    FindPok();
  }, []);

  useEffect(() => {
    console.log();
  }, [search]);

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
      <div>Pokemon Tracker App Test here</div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="PokeContainer">
        {pokeapi
          .filter((element) =>
            element.species.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((poke, idx) => {
            return <PokemonCell pokemon={poke} key={idx} />;
          })}
      </div>
    </div>
  );
}

export default App;
