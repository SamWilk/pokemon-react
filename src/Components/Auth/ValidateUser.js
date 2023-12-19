import { getMyAPIUrl } from "../../configURL";

export const ValidateUserMethod = async (cookies) => {
  const apiURL = getMyAPIUrl();

  const userResponse = await fetch(`${apiURL}/users/getUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.Bearer}`,
    },
  });

  const authUser = await userResponse.json();

  return authUser;
};
