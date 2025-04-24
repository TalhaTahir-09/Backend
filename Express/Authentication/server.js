 require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 4000;
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.set("view engine", "ejs")
// const userRoutes = require("./routes/userRoutes.js")
// app.use("/users", userRoutes)

// JWT Authentication

const users = [
  {
    "username": "Talha",
    "ID": 1
  },
  {
    "username": "Omer",
    "ID": 2
  },


]
app.get("/users", authenticateToken, (req, res) => {
    res.json(users)
});
app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { "username": username };
    const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN_KEY);
    res.json({"accessToken": accessToken})
  
})
function authenticateToken(req, res, next) {

}

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
