require("dotenv").config();

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 2000;
const fs = require("node:fs");
const db = require("./db.json");
app.use(express.json());

const users = db.users;

// JWT Authentication

app.get("/users/", authenticateToken, (req, res) => {
  let user = users.filter(user => req.user.username === user.username)
  res.send(user)
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





// Simple Authentication

// app.use(express.urlencoded({ extended: true }))
// app.set("view engine", "ejs")
// const userRoutes = require("./routes/userRoutes.js")
// app.use("/users", userRoutes)