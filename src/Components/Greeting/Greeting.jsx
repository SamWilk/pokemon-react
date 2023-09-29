import { getMyUrl } from "../../configURL";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setUser } from "../Auth/AuthSlice";

const Greetings = () => {
  const url = getMyUrl();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const authUser = useSelector((state) => state.auth.value);

  useEffect(() => {
    if (!authUser.name || !authUser.userID) {
      dispatch(
        setUser({
          name: searchParams.get("userName"),
          userID: searchParams.get("userID"),
        })
      );
    }
  }, []);

  return <div>Hey Trainer, {authUser.name}</div>;
};

export default Greetings;
