const router = require("express").Router();
// const sequelize = require("../config/connection");
// const { User, Blog, Comment } = require("../models");


router.get("/", (req, res) => {
   res.render("homepage");
  });

  router.get("/signup", (req, res) => {
    res.render("signUp");
   });

module.exports = router;
