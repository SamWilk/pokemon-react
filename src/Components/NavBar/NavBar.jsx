import "./NavBar.css";
import RouteConfig from "../../RouteConfig/RouteConfig";
import NavButton from "./NavButton/NavButton";

const NavBar = () => {
  return (
    <nav className="NavBar-Container">
      {RouteConfig.map(({ path, element }, index) => {
        return <NavButton key={index} props={{ path, element }} />;
      })}
    </nav>
  );
};

export default NavBar;
