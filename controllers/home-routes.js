const router = require("express").Router();
const { User, Blog, Comment } = require("../models");


//direct to homepage or dashboard based on whether they're logged in
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("dashboard");
    return;
  }
  res.render("homepage");
});

//direct to signup form
router.get("/signup", (req, res) => {
  res.render("signup");
});


//Main Blog Page (show all blogs)
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
      //loop over & map each Sequelize obj into a serialized version of itself
      const blogs = dbData.map((blog) => blog.get({ plain: true }));
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

//Blog Details Page
router.get("/all_blogs/:id", (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "blog_title", "blog_content", "created_at"],
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
      if (dbData) {
        const blog = dbData.get({ plain: true });
        console.log(blog);
        res.render("view_content", {
          blog,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


module.exports = router;
