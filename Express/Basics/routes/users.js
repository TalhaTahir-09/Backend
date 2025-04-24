const express = require("express");
const router = express.Router();
let users = [{ name: "Talha" }, { name: "Omer" }];
router.get("/", (req, res) => {
  res.render("users", { users });
});
console.log(users)
router.get("/add", (req, res) => {
  res.render("addusers", { value: "Talha" });
});
router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users = [...users, {name: req.body.username}];
    res.redirect(`/users`);
  } else {
    console.log("Error");
    res.render("addusers", { value: req.body.username });
  }
});
router
  .route("/:id")
  .get(logger, (req, res) => {
    res.send(`Get user with Id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with Id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Update user with Id ${req.params.id}`);
  });
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});
module.exports = router;
