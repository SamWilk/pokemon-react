import { useState } from "react";
import "./LoginForm.css";
import { useFormik } from "formik";

const LoginForm = () => {
  const [invalidLogin, setInvalidLogin] = useState();

  const initialValues = {
    name: "",
    password: "",
  };

  const onSubmit = async (values) => {
    console.log("Submitted Values ", values);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.status != "200") {
        setInvalidLogin("User Name or Password not correct");
        throw new Error("User was not found");
      } else {
        window.location.replace("http://localhost:5173/pokemon-react/");
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
    <div className='FormContainer'>
      <form onSubmit={formik.handleSubmit}>
        {invalidLogin ? <div className='error'>{invalidLogin}</div> : null}
        <div className='form-control'>
          <label htmlFor='name'>User Name</label>
          <input
            type='text'
            id='name'
            name='name'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <div className='error'>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className='error'>{formik.errors.password}</div>
          ) : null}
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;