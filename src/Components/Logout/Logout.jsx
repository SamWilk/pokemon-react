import { useCookies } from "react-cookie";
import { getMyUrl } from "../../configURL";
import "./Logout.css";

const Logout = () => {
  const [, , removeCookie] = useCookies("Bearer");
  const url = getMyUrl();

  const LogoutMethod = () => {
    const currentDate = new Date();

    // Add five days to the current date
    const fiveDaysFromNow = new Date(currentDate);
    fiveDaysFromNow.setUTCDate(currentDate.getUTCDate() + 5);
    removeCookie("Bearer", {
      path: "/",
    });
    window.location.replace(`${url}/pokemon-react/login`);
  };

  return (
    <button className="GenButton" onClick={() => LogoutMethod()}>
      Logout
    </button>
  );
};

export default Logout;
