import { useState } from "react";
import "./SignUpForm.css";
import { Form, Field, Formik } from "formik";

const SignUpForm = () => {
  const [invalidLogin, setInvalidLogin] = useState();

  const validate = (values) => {
    let errors = {};

    if (!values.email) errors.email = "Required";

    if (!values.name) errors.name = "Required";

    if (!values.password) errors.password = "Required";

    if (!values.ConfirmPassword) errors.ConfirmPassword = "Required";

    return errors;
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.status != "201") {
        setInvalidLogin("User already exists with username or email");
        throw new Error("User already exists with username or email");
      } else {
        window.location.replace("http://localhost:5173/pokemon-react/");
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
            <label htmlFor='name'>First Name</label>
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
