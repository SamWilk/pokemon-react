import { useEffect, useState, memo } from "react";
import "./App.css";
import { PokemonList } from "./Components/PokemonList/PokemonList";
import { RadioGroup, RadioButton } from "react-radio-buttons";

/*
 * Construct a pokemon object to pass around in the application rather than work with requests
 * all the time.
 * Call once load times are down and less api calls
 */

function App() {
  const [pokeapi, setPokeapi] = useState(new Array());
  const [gen, setGen] = useState("");

  useEffect(() => {
    FindPok();
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
      <div>
        Poke Tracker
        <RadioGroup>
          <RadioButton value="Gen-1">Gen 1</RadioButton>
        </RadioGroup>
      </div>
      <div className="PokeContainer">
        <PokemonList List={pokeapi} />
      </div>
    </div>
  );
}

export default App;
