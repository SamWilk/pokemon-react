import { useState } from "react";
import "./Login.css";
import LoginForm from "./LoginComponent/LoginForm";
import SignUpForm from "./SignupComponent/SignUpForm";

const Login = () => {
  const [loginState, setLoginState] = useState(true);
  return (
    <div className='App'>
      {loginState ? <LoginForm /> : null}

      {!loginState ? <SignUpForm /> : null}
      <div>
        <button onClick={() => setLoginState(!loginState)}>
          {loginState ? "Sign Up Form" : "Login In Form"}
        </button>
      </div>
    </div>
  );
};

export default Login;
