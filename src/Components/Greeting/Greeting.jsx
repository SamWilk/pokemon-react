import { getMyAPIUrl } from "../../configURL";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import User from "../../Objects/User";

const Greetings = () => {
  const APIUrl = getMyAPIUrl();
  const [cookies] = useCookies(["Bearer"]);
  const [user, setUser] = useState(new User());

  useEffect(() => {
    if (cookies) {
      something();
    }
  }, []);

  const something = async () => {
    const userResponse = await fetch(`${APIUrl}/users/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.Bearer}`,
      },
    });

    setUser(await userResponse.json());
  };

  return <div>Hey Trainer, {user.name}</div>;
};

export default Greetings;
