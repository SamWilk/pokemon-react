import { useEffect, useState, memo } from "react";
import "./App.css";
import { PokemonList } from "./Components/PokemonList/PokemonList";
import { RadioGroup, Radio } from "react-radio-group";
import { GenEnum } from "./Objects/GenEnum";
/*
 * Construct a pokemon object to pass around in the application rather than work with requests
 * all the time.
 * Call once load times are down and less api calls
 */

function App() {
  const [pokeapi, setPokeapi] = useState(new Array());
  const [gen, setGen] = useState();
  const [genArray, setGenArray] = useState(new Array());
  const [urlSearchParams, seturlSearchParams] = useState({
    offset: 0,
    limit: 151,
  });

  useEffect(() => {
    FindPok();
    PopulateArray();
  }, []);

  useEffect(() => {
    FormUrl();
    FindPok();
  }, [gen]);

  //https://pokeapi.co/api/v2/generation/1/

  const FormUrl = () => {
    if (gen != undefined) {
      seturlSearchParams(GenEnum[gen]);
    }
  };

  const FindPok = async () => {
    let temp = [];
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        urlSearchParams.offset === undefined ? 0 : urlSearchParams.offset
      }&limit=${urlSearchParams.limit}`
    );
    const body = await res.json();
    console.log(body);
    for (let i = 1; i < body.results.length + 1; i++) {
      if (body.results[i] != undefined) {
        const res = await fetch(body.results[i].url);
        const body2 = await res.json();
        temp.push(body2);
      }
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
            let genString = "Gen" + value;
            return (
              <span key={idx} className="radioButton">
                <Radio value={genString} />
                Gen {value}
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
