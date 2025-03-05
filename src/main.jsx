import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store";
import RouteConfig from "./RouteConfig/RouteConfig";
import NavBar from "./Components/NavBar/NavBar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          {RouteConfig.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
