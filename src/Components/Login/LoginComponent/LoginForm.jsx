import { useContext, useState } from "react";
import "./LoginForm.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../Auth/AuthSlice";
import { getMyAPIUrl, getMyUrl } from "../../../configURL";
import { useCookies } from "react-cookie";

const LoginForm = () => {
  const [invalidLogin, setInvalidLogin] = useState();
  const dispatch = useDispatch();
  const url = getMyUrl();
  const [, setCookie] = useCookies(["Bearer"]);
  const APIURL = getMyAPIUrl();

  const initialValues = {
    name: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${APIURL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.status != "200") {
        setInvalidLogin("User Name or Password not correct");
        throw new Error("User was not found");
      } else {
        const body = await response.json();
        const user = {
          name: body.name,
          userID: body.userID,
        };
        dispatch(login(user));
        const currentDate = new Date();

        // Add five days to the current date
        const fiveDaysFromNow = new Date(currentDate);
        fiveDaysFromNow.setUTCDate(currentDate.getUTCDate() + 5);
        setCookie("Bearer", body.accessToken, {
          path: "/",
          expires: fiveDaysFromNow,
        });
        window.location.replace(`${url}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) errors.name = "Required";

    if (!values.password) errors.password = "Required";

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        {invalidLogin ? <div className="error">{invalidLogin}</div> : null}
        <div className="form-control">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="User Name"
            className="form-input"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="form-input"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
