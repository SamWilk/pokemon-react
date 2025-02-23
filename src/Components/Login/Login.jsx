import { useState } from "react";
import "./Login.css";
import LoginForm from "./LoginComponent/LoginForm";
import SignUpForm from "./SignupComponent/SignUpForm";
import pokeball from "../../../public/pokeball-outline.png";

const Login = () => {
  const [loginState, setLoginState] = useState(true);
  return (
    <div className="App">
      <div className="Sub-App-Container">
        <div className="Login-Title">
          <h1>Pokemon React Tracker</h1>
          <img
            className="pokeball"
            src={pokeball}
            alt="Pokemon-Ball"
            height={150}
            width={150}
          />
        </div>

        <div className="Login-screen">
          {loginState ? <LoginForm /> : null}

          {!loginState ? <SignUpForm /> : null}
          <button
            className="submit-button"
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
