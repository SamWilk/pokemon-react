import "./NavButton.css";
import { getMyUrl } from "../../../configURL";

const NavButton = ({ props }) => {
  const buttonTitle = props.path;
  const url = getMyUrl();

  const UpdateTitle = (title) => {
    const tokens = title.split("/");
    return tokens[1] != "" ? tokens[1] : "Pokemon";
  };

  return (
    <nav className="NavButton-Container">
      <button
        onClick={() => {
          const newURL = url + buttonTitle;
          window.location.replace(`${newURL}`);
        }}
      >
        {UpdateTitle(buttonTitle)}
      </button>
    </nav>
  );
};

export default NavButton;
