require("dotenv").config();

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 1000;
const fs = require("node:fs");
const db = require("./db.json");
app.use(express.json());
let users = db.users;
let refreshTokens = db.refreshTokens;

// app.use(express.urlencoded({ extended: true }))
// app.set("view engine", "ejs")
// const userRoutes = require("./routes/userRoutes.js")
// app.use("/users", userRoutes)

// JWT Authentication

app.get("/users", authenticateToken, (req, res) => {
  let user = users.filter((user) => req.user.username === user.username);
  res.send(user);
});
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401);
  }
  let tokenExists = refreshTokens.find(
    (token) => token.refreshToken === refreshToken
  );
  console.log(tokenExists.refreshToken);

  if (!tokenExists) {
    res.status(403);
  }
  jwt.verify(
    tokenExists.refreshToken,
    process.env.SECRET_REFRESH_TOKEN_KEY,
    (err, user) => {
      if (err) {
        res.status(403);
      } else {
        const accessToken = generateAccessToken({
          username: user.username,
          password: user.password,
        });
        res.json({ accessToken: accessToken });
      }
    }
  );
});
app.delete("/logout", (req, res) => {
  console.log(refreshTokens[0].refreshToken);
  console.log("Here 1234");
  let newTokens;
  newTokens = refreshTokens.filter(
    (token) => token.refreshToken !== req.body.token
  );
  console.log(newTokens);
  let pushedData = JSON.stringify({
    users: users,
    refreshTokens: newTokens,
  });
  fs.writeFile("./db.json", pushedData, (err) => {
    if (err) res.send("Ran into an Error: " + err).status(401);
  });
});
app.post("/signup", (req, res) => {
  const plainPassword = req.body.password;

  bcrypt.hash(plainPassword, 10, function (err, hash) {
    if (err) {
      res.send("Ran Into an error" + err);
    } else {
      let user = { username: req.body.username, password: hash };
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.SECRET_REFRESH_TOKEN_KEY, {expiresIn: "20s"});
      users.push(user);
      refreshTokens.push({ refreshToken });
      let pushedData = JSON.stringify({
        users: users,
        refreshTokens: refreshTokens,
      });
      console.log(pushedData);
      fs.writeFile("./db.json", pushedData, (err) => {
        if (err) res.send("Ran into an Error: " + err).status(401);
      });
      res.send({ accessToken: accessToken, refreshToken: refreshToken });
    }
  });
});
function generateAccessToken(user) {
  let accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN_KEY, {
    expiresIn: "15s",
  });
  return accessToken;
}
app.post("/login", (req, res) => {
  const user = users.find((user) => req.body.username === user.username);
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN_KEY);
  console.log(accessToken);
  res.send({ accessToken: accessToken, refreshToken: refreshToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN_KEY, (err, user) => {
    if (err) {
      res.status(201);
      res.send("Ran into an error" + JSON.stringify(err));
    } else {
      req.user = user;
      next();
    }
  });
}

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
