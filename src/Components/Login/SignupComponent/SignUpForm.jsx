import { useState } from "react";
import "./SignUpForm.css";
import { Form, Field, Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../Auth/AuthSlice";
import { getMyAPIUrl } from "../../../configURL";

const SignUpForm = () => {
  const [invalidLogin, setInvalidLogin] = useState();
  const dispatch = useDispatch();
  const APIUrl = getMyAPIUrl();

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
        setInvalidLogin("User already exists with username or email");
        throw new Error("User already exists with username or email");
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
        window.location.replace(
          `${url}/pokemon-react/?userID=${user.userID}?userName=${user.name}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='FormContainer'>
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
          <Form>
            <label htmlFor='name'>User Name</label>
            <Field name='name' placeholder='Joe' />

            <label htmlFor='email'>Email</label>
            <Field name='email' placeholder='Joe@yahoo.com' />

            <label htmlFor='password'>Password</label>
            <Field name='password' type='password' />

            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
