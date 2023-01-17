import { useEffect, useState, memo } from "react";
import "./App.css";
import { PokemonList } from "./Components/PokemonList/PokemonList";
import { RadioGroup, Radio } from "react-radio-group";
/*
 * Construct a pokemon object to pass around in the application rather than work with requests
 * all the time.
 * Call once load times are down and less api calls
 */

function App() {
  const [pokeapi, setPokeapi] = useState(new Array());
  const [gen, setGen] = useState("");
  const [genArray, setGenArray] = useState(new Array());

  useEffect(() => {
    FindPok();
    PopulateArray();
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

  const PopulateArray = () => {
    let temp = [];
    for (let i = 1; i < 9; i++) {
      temp.push(i);
    }
    setGenArray(temp);
  };

  return (
    <div className="App">
      <div className="sideBar">
        Poke Tracker
        <RadioGroup
          className="radioContainer"
          selectedValue={gen}
          onChange={(e) => setGen(e)}
        >
          {genArray.map((value, idx) => {
            return (
              <span key={idx} className="radioButton">
                <Radio value="gen" />
                Gen {idx}
              </span>
            );
          })}
        </RadioGroup>
      </div>
      <div className="PokeContainer">
        <PokemonList List={pokeapi} />
      </div>
    </div>
  );
}

export default App;
