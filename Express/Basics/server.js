const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.get('/users', (req, res) => {
//     res.render('users', {users: {one: {name: "Talha", age: 15}, two: {name: "Omer", age: 13}}})
//     console.log("rendered Users")
// })
// app.get('/users/add', (req, res) => {
//     res.render('addusers')
// })

const userRouter = require("./routes/users.js");
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server is listening on the port 3000");
});
