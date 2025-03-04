const express = require("express");
const db = require("../config/DBContext");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
require("dotenv").config();
const authenticateToken = require("../config/AuthenticateToken");

const router = express.Router();

// Will need a check to make sure users cannot use the same name
// Testing something out
router.post("/api/users", async (request, response) => {
  let createUserFlag = true;
  const checkNamequery = {
    text: `select * from users where name = $1 or email = $2`,
    values: [request.body.name, request.body.email],
  };
  try {
    const client = await db.connect();
    client.query(checkNamequery, async (err, res) => {
      if (res.rowCount >= 1) {
        createUserFlag = false;
        response.status(400).send("User already exists with username or email");
      } else {
        let password;
        try {
          password = await bcrypt.hash(request.body.password, 10);
        } catch {
          console.log("Issue while hashing password");
        }
        const query = {
          text: `insert into users (id, name, email, password)
            values (uuid_generate_v4(), $1, $2, $3)`,
          values: [request.body.name, request.body.email, password],
        };
        client.query(query, (err, res) => {
          if (err) {
            console.error(err);
            response.status(400).send();
          } else {
            response.status(201).send(request.body.name);
          }
        });
      }
    });
    client.release();
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/users/login", async (request, response) => {
  try {
    const client = await db.connect();
    const query = {
      text: `select u.id, u.name, u.password
          from users u
          where u.name = $1`,
      values: [request.body.name],
    };
    client.query(query, async (err, res) => {
      if (err) {
        console.error(err);
        response.status(500).send(`An Error occured ${err}`);
      }
      if (res.rowCount == 0) {
        response.status(404).send("No user found");
      } else {
        const checkUser = res.rows.pop();
        if (await bcrypt.compare(request.body.password, checkUser.password)) {
          // User has been authenticated, create JWT token
          const user = { name: checkUser.name, userID: checkUser.id };
          const accessToken = jwt.sign(user, process.env.JWT_TOKEN_ACCESS);
          response.status(200).json({
            accessToken: accessToken,
            name: checkUser.name,
            userID: checkUser.id,
          });
        } else {
          response.status(400).send("Passwords do not match");
        }
      }
    });
    client.release();
  } catch (error) {
    console.log("Something happened");
    console.log(error);
    response.status(500).send();
  }
});

router.get(
  "/api/users/getUser",
  authenticateToken,
  async (request, response) => {
    response.status(200).send(request.user);
  }
);

router.patch("/api/users", authenticateToken, async (request, response) => {
  try {
    const client = await db.connect();
    const query = {
      text: `update users
             set name = $1
             where id = $2`,
      values: [request.body.name, request.body.userID],
    };
    client.query(query, async (err, res) => {
      if (err) {
        console.error(err);
        console.log("No Pokemon Found");
        response.status(400).send();
      } else {
        console.log(`User updated: ${request.body.name}`);
        response.status(200).send(`User updated: ${request.body.name}`);
      }
    });
    client.release();
  } catch (error) {
    console.log("Could not update user name");
    console.log(error);
    response.status(500).send(`Error Updating User: ${request.body.name}`);
  }
});

module.exports = router;
