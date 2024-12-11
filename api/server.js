const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const db = require("./config/DBContext");

app.use(express.json());
app.use(cors());

const portNumber = process.env.PORTNUMBER || 3000;

const pokemon = require("./routes/pokemon");
const users = require("./routes/users");

app.get("/api", async (req, res) => {
  res.send("Pokemon-react-Server is running");
});
app.use(pokemon);
app.use(users);

app.listen(portNumber, () => {
  console.log(`Server, listening on port ${portNumber}...`);
});

module.exports = app;
