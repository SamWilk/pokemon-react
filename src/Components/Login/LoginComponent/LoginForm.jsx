import "./LoginForm.css";
import { useFormik } from "formik";

const LoginForm = () => {
  const initialValues = {
    userName: "",
    password: "",
  };

  const onSubmit = async (values) => {
    // Add login call here
    console.log("Form Values: ", values);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.userName) errors.userName = "Required";

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
        <div className='form-control'>
          <label htmlFor='userName'>UserName</label>
          <input
            type='text'
            id='userName'
            name='userName'
            onChange={formik.handleChange}
            value={formik.values.userName}
          />
          {formik.errors.userName ? (
            <div className='error'>{formik.errors.userName}</div>
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
