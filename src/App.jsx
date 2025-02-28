import { useEffect } from "react";
import "./App.css";
import Pokemon from "./Components/Pokemon/Pokemon";
import { getMyAPIUrl, getMyUrl } from "./configURL";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies("Bearer");

  useEffect(() => {
    const url = getMyUrl();

    if (!cookies.Bearer) {
      window.location.replace(`${url}/login`);
    }

    CheckUser(url);
  }, []);

  const CheckUser = async (url) => {
    const APIUrl = getMyAPIUrl();
    try {
      const userResponse = await fetch(`${APIUrl}/users/pokemon`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.Bearer}`,
        },
      });
      if (userResponse.status != "200") {
        window.location.replace(`${url}/login`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2217671962826733'
        crossorigin='anonymous'
      ></script>
      <div className='PokeContainer'>
        <Pokemon />
      </div>
    </div>
  );
}

export default App;
