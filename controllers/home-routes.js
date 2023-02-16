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

// router.get('/dashboard', (req, res) => {
//   console.log(req.session);
//   res.render('dashboard', {
//     loggedIn: req.session.loggedIn
//   });
// });


//Blog Page (show all blogs)
router.get("/all_blogs", (req, res) => {
  console.log("hello blogs");
  Blog.findAll({
    attributes: [
      "id",
      "blog_title",
      "blog_content",
      "created_at",
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbData) => {
      //loop over & map each Sequelize obj into a serialized version of itself & saving results in a new posts array
      const blogs = dbData.map((blog) => blog.get({ plain: true }));
      //use .render vs .sendFile() for using template engine->specify which template to use
      //the .handlebars extension is implied
      res.render('all_blogs', {
        blogs,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});



module.exports = router;
