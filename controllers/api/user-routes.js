const router = require("express").Router();
const { User } = require("../../models");

//get all users (/api/users)
router.get('/', (req, res) => {
    // Access our User model & .findAll() to query all users from user table in db
      User.findAll({
        attributes: { exclude: ['password'] }
      })
        .then(dbData => res.json(dbData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
    
//create new user login (api/users)
router.post("/", (req, res) => {
  //expected {"username": "UserNameHere", "email": "abc@gmail.com", "password": "pswd123"}
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }).then((dbData) => {
    //TODO: add verification
    res.json(dbData);
  });
});

//user login and identity verification (/api/users/login)
router.post("/login", (req, res) => {
  // expected input {"email": "email.com","password": "password123"}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbData) => {
    if (!dbData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    const validPassword = dbData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // req.session.save(() => {
    //   // declare session variables
    //   req.session.user_id = dbData.id;
    //   req.session.username = dbData.username;
    //   req.session.loggedIn = true;

      res.json({ user: dbData, message: 'You are now logged in!' });
    });
 // });
});

//User Log-Out (/api/users/logout)
router.post("/logout", (req, res) => {
  // if (req.session.loggedIn) {
  //   req.session.destroy(() => {
  //     res.status(204).end();
  //   });
  // } else {
    res.status(404).end();
  // }
});

module.exports = router;