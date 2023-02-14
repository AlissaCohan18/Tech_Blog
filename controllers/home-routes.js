const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("dashboard");
    return;
  }
 //sign-in
  res.render("homepage");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get('/dashboard', (req, res) => {
  console.log(req.session);
  res.render('dashboard', {
    loggedIn: req.session.loggedIn
  });
});

router.get("/all_blogs", (req, res) => {
  res.render("all_blogs");
});


module.exports = router;
