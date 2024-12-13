// config.js

const config = {
  production: {
    SiteUrl: "http://www.pokemon-react.com", // Your production API URL
    APIUrl: "http://139.144.255.36/api",
  },
  development: {
    SiteUrl: "http://localhost:88", // Your development API URL
    APIUrl: "http://localhost:88/api",
  },
  local: {
    SiteUrl: "http://localhost:4000", // Your local API URL
    APIUrl: "http://localhost:3000/api",
  },
};

export default config;
