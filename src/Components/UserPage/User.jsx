import { useEffect, useState } from "react";
import { getMyAPIUrl, getMyUrl } from "../../configURL";
import "./User.css";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";

const UserPage = ({
  open,
  onClose,
  currentUser,
  cookies,
  useFormik,
  invalidUpdate,
}) => {
  if (!open) return null;

  const formik = useFormik;

  return (
    <div className="ProfileContainer">
      <div className="ProfileContent">
        <h2>Update Trainer {currentUser.name}</h2>
        <form className="updateForm" onSubmit={formik.handleSubmit}>
          {invalidUpdate ? <div className="error">{invalidUpdate}</div> : null}

          <input
            id="name"
            name="name"
            className="updateName"
            placeholder={currentUser.name}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div>
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserPage;
