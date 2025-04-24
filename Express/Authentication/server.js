require("dotenv").config();

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 4000;
const fs = require("node:fs");
const users = require("./users.json");
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
// app.set("view engine", "ejs")
// const userRoutes = require("./routes/userRoutes.js")
// app.use("/users", userRoutes)

// JWT Authentication

app.get("/users", authenticateToken, (req, res) => {
  let user = users.filter(user => req.user.username === user.username)
  res.send(user)
});
app.post("/signup", (req, res) => {
  const plainPassword = req.body.password;
  bcrypt.hash(plainPassword, 10, function (err, hash) {
    if (err) {
      res.send("Ran Into an error" + err);
    } else {
      let user = { username: req.body.username, password: hash };
      users.push(user);
      fs.writeFile("./users.json", JSON.stringify(users), (err) => {
        if (err) res.send("Ran into an Error: " + err).status(401);
        const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN_KEY);
        console.log(accessToken);
        res.send({ accessToken: accessToken });
      });
    }
  });
});
app.post("/login", (req, res) => {
  const user = users.find((user) => req.body.username === user.username);
  const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN_KEY);
  console.log(accessToken);
  res.send({ accessToken: accessToken });
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN_KEY, (err, user) => {
    if(err){
      res.status(201)
      res.send("Ran into an error" + JSON.stringify(err));
    }else{
      req.user = user
      next()
    }
  });
}

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
