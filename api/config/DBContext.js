const { Pool } = require("pg");
require("dotenv").config({ path: `.env${process.env.NODE_ENV}` });

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT || 5432,
});

module.exports = db;
