import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import { Provider } from "react-redux";
import store from "./Store/store";
import UserPage from "./Components/UserPage/User";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/pokemon-react" element={<App />} />
          <Route path="/pokemon-react/login" element={<Login />} />
          <Route path="/pokemon-react/userpage" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
