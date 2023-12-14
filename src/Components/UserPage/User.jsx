import { useState } from "react";
import { getMyAPIUrl } from "../../configURL";
import "./User.css";

const UserPage = ({ open, onClose, currentUser }) => {
  if (!open) return null;
  const [newUserName, setNewUserName] = useState("");
  const APIURL = getMyAPIUrl();

  const UpdateName = async (newName) => {
    // Make API call here
    console.log("Updating Name");
  };

  return (
    <div className='ProfileContainer'>
      <div>
        <div>Hello there Trainer {currentUser.name}</div>
        <div>You've been with us since X date</div>
      </div>
      <div>
        <h2>Edit Form for {currentUser.name} Trainer</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await UpdateName();
          }}
        >
          <input
            placeholder={currentUser.name}
            value={newUserName}
            onChange={(e) => {
              setNewUserName(e.target.value);
            }}
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
