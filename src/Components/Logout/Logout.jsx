import { useCookies } from "react-cookie";
import { getMyUrl } from "../../configURL";

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
    <div>
      <button onClick={() => LogoutMethod()}>Logout</button>
    </div>
  );
};

export default Logout;
