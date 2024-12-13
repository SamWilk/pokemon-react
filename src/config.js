// config.js

const config = {
  production: {
    SiteUrl: "https://www.pokemon-react.com",
    APIUrl: "https://www.pokemon-react.com/api",
  },
  development: {
    SiteUrl: "http://localhost:88",
    APIUrl: "http://localhost:88/api",
  },
  local: {
    SiteUrl: "http://localhost:4000",
    APIUrl: "http://localhost:3000/api",
  },
};

export default config;
