import axios from "axios";
import { getMyAPIUrl } from "../../../configURL";

export async function GetUserDetails(cookies) {
  // Get back the user's pokemon they have flagged
  // api/users/pokemon
  const APIURL = getMyAPIUrl();
  var usersPokemon = new Array();
  var user = undefined;
  try {
    const responsePokemon = await fetch(`${APIURL}/users/pokemon`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.Bearer}`,
      },
    });
    if (responsePokemon.status != "200") {
      throw new Error("Unable to get users pokemon");
    } else {
      usersPokemon = await responsePokemon.json();
    }

    const responseUser = await fetch(`${APIURL}/users/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.Bearer}`,
      },
    });
    if (responseUser.status != "200") {
      throw new Error("Unable to get user");
    } else {
      user = await responseUser.json();
    }

    return { userObject: user, usersPokemon: usersPokemon };
  } catch (error) {
    console.error("Error trying to get user");
    console.error(error);
  }
}
