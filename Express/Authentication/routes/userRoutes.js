const express = require("express");
const users = require("../users.json");
const fs = require("fs");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Sign Up 
router.post("/signup", async (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      res.status(400);
      res.send("Ran into an Error!");
    } else {
      users.push({ username: req.body.username, password: hash });
      let stringArray = JSON.stringify(users)
      console.log(stringArray);
      fs.writeFile("./users.json", stringArray, (err) => {
        if (err) console.log(err);
      });
      res.send("Signup");
      res.status(200);
      console.log(users);
    }
  });
});
// login
router.post('/login', (req, res) => {
    const user = users.find( user => user.username === req.body.username)
    if(!user){
        res.status(404);
        res.send("User not found!")
    }else{
        console.log(user)
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(!result){
                res.send("Password is incorrect!")
                res.status(200)
            }else{
                res.status(200)
                res.send("User logged in!")
            }
        })
    }
    })



module.exports = router;
