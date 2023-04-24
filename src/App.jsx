import "./App.css";
import Pokemon from "./Components/Pokemon/Pokemon";

/*
 * Construct a pokemon object to pass around in the application rather than work with requests
 * all the time.
 * Call once load times are down and less api calls
 */

function App() {
  return (
    <div className="App">
      <div className="PokeContainer">
        <Pokemon />
      </div>
    </div>
  );
}

export default App;
