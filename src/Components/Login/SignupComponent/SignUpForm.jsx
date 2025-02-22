import { useState } from "react";
import "./SignUpForm.css";
import { Form, Field, Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../Auth/AuthSlice";
import { getMyAPIUrl, getMyUrl } from "../../../configURL";
import { useCookies } from "react-cookie";

const SignUpForm = () => {
  const [invalidLogin, setInvalidLogin] = useState();
  const dispatch = useDispatch();
  const APIUrl = getMyAPIUrl();
  const url = getMyUrl();
  const [, setCookie] = useCookies("Bearer");

  const validate = (values) => {
    let errors = {};

    if (!values.email) errors.email = "Required";

    if (!values.name) errors.name = "Required";

    if (!values.password) errors.password = "Required";

    if (!values.ConfirmPassword) errors.ConfirmPassword = "Required";

    return errors;
  };

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${APIUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.status != "201") {
        setInvalidLogin("User already exists with email");
        throw new Error("User already exists with email");
      } else {
        const loginResponse = await fetch(`${APIUrl}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (loginResponse.status != "200") {
          throw new Error("User was not found");
        } else {
          const body = await loginResponse.json();
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="FormContainer">
      {invalidLogin ? <div>{invalidLogin}</div> : null}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="Submit-Form">
            <div className="form-control">
              <label htmlFor="name">User Name</label>
              <Field name="name" placeholder="Joe" className="form-input" />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                placeholder="Joe@yahoo.com"
                className="form-input"
              />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="form-input"
              />
            </div>

            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
