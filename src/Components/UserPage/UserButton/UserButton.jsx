import { getMyUrl } from "../../../configURL";

const UserButton = () => {
  const url = getMyUrl();

  const Clicked = () => {
    window.location.replace(`${url}/userpage`);
  };

  return <button onClick={() => Clicked()}>Profile</button>;
};

export default UserButton;
