import { useEffect, useState } from "react";
import { getMyAPIUrl, getMyUrl } from "../../configURL";
import { useCookies } from "react-cookie";
import { GetUserDetails } from "./functions/FetchUserProfile";
import { PokemonList } from "../PokemonList/PokemonList";
//import Blastoise from "../../Images/Blastoise.png";
import PokeButton from "../PokeButton/PokeButton";
import "./Profile.css";

const Profile = () => {
  const URL = getMyUrl();
  const APIUrl = getMyAPIUrl();
  const [cookies] = useCookies("Bearer");
  const [currentUser, setCurrentUser] = useState();
  const [userPokemonList, setUserPokemonList] = useState(new Array());

  useEffect(() => {
    async function fetchData() {
      setCurrentUser(await GetUserDetails(cookies));
      console.log(currentUser);
    }
    fetchData();
  }, []);

  const GetPokemonList = async () => {
    const userResponse = await fetch(`${APIUrl}/users/pokemon`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.Bearer}`,
      },
    });
    const userPokemonList = await userResponse.json();
    pokemonList.map((e) => {
      e["Selected"] = false;
      userPokemonList.map((p) => {
        if (p.pokemonid == e.id) e["Selected"] = true;
      });
    });
    setUserPokemonList(userPokemonList);
  };

  return (
    <div>
      Hello Trainer,{" "}
      {currentUser != undefined ? currentUser.userObject.name : ""}
      <PokeButton
        className="plane"
        onClickAction={() => {
          window.location.replace(`${URL}/`);
        }}
      >
        Home
      </PokeButton>
      <div>
        {userPokemonList.length >= 1 ? (
          <PokemonList List={userPokemonList} Generation={0} />
        ) : (
          <div className="LoadingScreen">
            <img
              className="loadingImage"
              src={Blastoise}
              alt="Blastoise"
              height={300}
              width={300}
            />
            <h1>What did you catch?!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
