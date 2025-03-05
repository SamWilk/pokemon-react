import App from "../App";
import Login from "../Components/Login/Login";
import Landing from "../Components/Landing/Landing";

// routesConfig.js
const RouteConfig = [
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/landing", element: <Landing /> },
];

export default RouteConfig;
