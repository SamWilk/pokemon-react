import { useEffect, useState } from "react";
import { PokemonList } from "../PokemonList/PokemonList";
import "./Pokemon.css";
import { getMyAPIUrl, getMyUrl } from "../../configURL";
import { useCookies } from "react-cookie";
import Logout from "../Logout/Logout";
import Blastoise from "../../Images/blastoise.png";
import UserPage from "../UserPage/User";
import User from "../../Objects/User";
import { ValidateUserMethod } from "../Auth/ValidateUser";
import { useFormik } from "formik";

const Pokemon = () => {
  const [pokemonList, SetPokemonList] = useState(new Array());
  const [pokemonGen, SetPokemonGen] = useState(0);
  const [selectedPokemon, SetSelectedPokemon] = useState(new Array());
  const [cookies] = useCookies(["Bearer"]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(new User());
  const [invalidUpdate, setInvalidUpdate] = useState();

  let genArray = [1, 2, 3, 4, 5, 6, 7];
  const APIUrl = getMyAPIUrl();
  const url = getMyUrl();

  useEffect(() => {
    GetPokemon();
  }, [pokemonGen]);

  useEffect(() => {
    GetCurrentUser();
  }, []);

  const GetCurrentUser = async () => {
    setCurrentUser(await ValidateUserMethod(cookies));
  };

  const GetPokemon = async () => {
    if (pokemonGen == 0) {
      // Intial Get
      const defaultResponse = await fetch(`${APIUrl}/pokemon`);
      const pokemonList = await defaultResponse.json();

      //User Specific Get
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
      SetPokemonList(pokemonList);
    } else {
      const response = await fetch(`${APIUrl}/pokemon/gen/${pokemonGen}`);
      const pokemonList = await response.json();

      //User Specific Get
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
      SetPokemonList(pokemonList);
    }
  };

  // Make call to get selected pokemon

  const GenFilter = async (gen) => {
    SetPokemonGen(gen);
  };

  const initialValues = {
    name: "",
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) errors.name = "Required";

    return errors;
  };

  const onSubmit = async (values) => {
    // Make API call here
    try {
      const userResponse = await fetch(`${APIUrl}/users/${currentUser.name}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.Bearer}`,
        },
        body: JSON.stringify(values),
      });
      if (userResponse.status != "200") {
        //invalidUpdate = "Username already taken, choose another";
        setInvalidUpdate("Username already taken, choose another");
      } else {
        window.location.replace(`${url}/pokemon-react/`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='ListHolder'>
      <div className='SideColumn'>
        {/* <GenFilter /> */}
        <div className='Side-Top'>
          <h4>Choose the Generation</h4>
          <div className='GenContainer'>
            <input
              className='GenButton'
              type='button'
              value={`All Gen`}
              onClick={async () => {
                await GenFilter(0);
              }}
            />
            {genArray.map((gen) => {
              return (
                <input
                  className='GenButton'
                  key={gen}
                  type='button'
                  value={`Generation ${gen}`}
                  onClick={async () => {
                    await GenFilter(gen);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className='Side-Bottom'>
          <button className='GenButton' onClick={() => setShowModal(true)}>
            Profile
          </button>
          <UserPage
            open={showModal}
            onClose={() => setShowModal(false)}
            currentUser={currentUser}
            cookies={cookies}
            useFormik={useFormik({
              initialValues,
              onSubmit,
              validate,
            })}
            invalidUpdate={invalidUpdate}
          />
          <Logout />
        </div>
      </div>
      <div className='ListHolder'>
        {pokemonList.length >= 1 ? (
          <PokemonList List={pokemonList} Generation={pokemonGen} />
        ) : (
          <div className='LoadingScreen'>
            <img
              className='loadingImage'
              src={Blastoise}
              alt='Blastoise'
              height={300}
              width={300}
            />
            <h1>I'm working on it!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokemon;
