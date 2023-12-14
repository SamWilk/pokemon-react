import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import User from "../../Objects/User";
import { ValidateUserMethod } from "../Auth/ValidateUser";

const Greetings = () => {
  const [cookies] = useCookies(["Bearer"]);
  const [user, setUser] = useState(new User());

  useEffect(() => {
    if (cookies) {
      GetCurrentUser();
    }
  }, []);

  const GetCurrentUser = async () => {
    setUser(await ValidateUserMethod(cookies));
  };

  return <div>Hey Trainer, {user.name}</div>;
};

export default Greetings;
