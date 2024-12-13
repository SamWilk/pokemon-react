// config.js

const config = {
  production: {
    SiteUrl: "http://pokemon-react.com", // Your production API URL
    APIUrl: "http://pokemon-react.com/api",
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
