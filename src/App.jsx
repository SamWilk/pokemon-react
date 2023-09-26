import { useEffect } from "react";
import "./App.css";
import Pokemon from "./Components/Pokemon/Pokemon";
import { getMyUrl } from "./configURL";

function App() {
  useEffect(() => {
    const url = getMyUrl();
    const currentURL = window.location.href;

    const urlParams = new URLSearchParams(currentURL);

    if (!urlParams.toString().includes("userID=")) {
      window.location.replace(`${url}/pokemon-react/login`);
    }
  }, []);

  return (
    <div className='App'>
      <div className='PokeContainer'>
        <Pokemon />
      </div>
    </div>
  );
}

export default App;
