import { useState } from "react";
import { getMyAPIUrl, getMyUrl } from "../../configURL";
import "./User.css";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";

const UserPage = ({ open, onClose, currentUser }) => {
  if (!open) return null;
  const [newUserName, setNewUserName] = useState("");
  const [cookies] = useCookies("Bearer");
  const APIURL = getMyAPIUrl();
  const url = getMyUrl();
  const [invalidUpdate, setInvalidUpdate] = useState();

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
      const userResponse = await fetch(`${APIURL}/users/${currentUser.name}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.Bearer}`,
        },
        body: JSON.stringify(values),
      });
      if (userResponse.status != "200") {
        setInvalidUpdate("Username already taken, choose another");
      } else {
        window.location.replace(`${url}/pokemon-react/`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className='ProfileContainer'>
      <div className='ProfileContent'>
        <h2>Update Trainer {currentUser.name}</h2>
        <form onSubmit={formik.handleSubmit}>
          {invalidUpdate ? <div className='error'>{invalidUpdate}</div> : null}

          <input
            id='name'
            name='name'
            placeholder={currentUser.name}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserPage;
