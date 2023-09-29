import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Components/Auth/AuthSlice";

export default configureStore({
  reducer: { auth: AuthReducer },
});
