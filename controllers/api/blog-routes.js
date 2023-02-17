const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all blogs (include the post title and the date created)
router.get("/", (req, res) => {
  console.log("======================");
  Blog.findAll({
    attributes: ["id", "blog_title", "blog_content", "created_at"],
    //display posts by created_at timestamp in descending order
    order: [["created_at", "DESC"]],
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
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get Blog by BLOG ID
//get blog by blog_ID - post title, contents, post creator’s username, and date created for that post
router.get("/:id", (req, res) => {
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
      if (!dbData) {
        res.status(404).json({ message: "No Blog found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create new blog
router.post("/", withAuth, (req, res) => {
  //expected {"blog_title": "Title Here", "blog_content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
  Blog.create({
    blog_title: req.body.blog_title,
    blog_content: req.body.blog_content,
    user_id: req.session.user_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update blog content
router.put("/:id", withAuth, (req, res) => {
  Blog.update(
    {
      blog_content: req.body.blog_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No Blog found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete blog
router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No Blog found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
