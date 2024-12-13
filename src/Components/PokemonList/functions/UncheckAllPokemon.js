import axios from "axios";
import { getMyAPIUrl } from "../../../configURL";

export async function UncheckAllPokemon(user, cookies){
    const APIURL = getMyAPIUrl();
    try {
        const response = await fetch(`${APIURL}/users/delete/pokemon/all`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.Bearer}`,
              }
            });
          if (response.status != "202") {
            throw new Error("Unable to remove all Pokemon Flags");
          } else {
            console.log("Pokemon Flags Removed")
        }
    } 
    catch (error){
        console.error("Error trying to remove all pokemon flags");
        console.error(error);
    }
}