const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

//get all users (/api/users)
router.get('/', (req, res) => {
    // Access our User model & .findAll() to query all users from user table in db
      User.findAll({
        attributes: { exclude: ['password'] }
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
    
//create new user login (api/users)
router.post("/", (req, res) => {
  //expected {"username": "UserNameHere", "email": "abc@gmail.com", "password": "pswd123"}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
    //TODO: add verification
    res.json(dbUserData);
  });
});

module.exports = router;