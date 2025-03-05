import { useState, useEffect } from "react";
import "./Login.css";
import LoginForm from "./LoginComponent/LoginForm";
import SignUpForm from "./SignupComponent/SignUpForm";
import pokeball from "../../../public/pokeball-outline.png";
import { useCookies } from "react-cookie";
import { getMyUrl, getMyAPIUrl } from "../../configURL";

const Login = () => {
  const [loginState, setLoginState] = useState(true);
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
      const userResponse = await fetch(`${APIUrl}/users/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.Bearer}`,
        },
      });
      if (userResponse.status == "200") {
        window.location.replace(`${url}/landing`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <div className='Sub-App-Container'>
        <div className='Login-Title'>
          <h1>Pokemon React Tracker</h1>
          <img
            className='pokeball'
            src={pokeball}
            alt='Pokemon-Ball'
            height={150}
            width={150}
          />
        </div>

        <div className='Login-screen'>
          {loginState ? <LoginForm /> : null}

          {!loginState ? <SignUpForm /> : null}
          <button
            className='submit-button'
            onClick={() => setLoginState(!loginState)}
          >
            {loginState ? "Sign Up Form" : "Login In Form"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
