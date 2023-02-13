const router = require("express").Router();
const { Blog } = require("../../models");

// get all blogs (include the post title and the date created)
router.get("/", (req, res) => {
  console.log("======================");
  Blog.findAll({
    // attributes: ["id", "blog_title", "blog_content", "created_at"],
    // //display posts by created_at timestamp in descending order
    // order: [["created_at", "DESC"]],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO get blog by ID - post title, contents, post creator’s username, and date created for that post

//TODO get blog by userid

//create new blog
router.post("/", (req, res) => {
  //expected {"blog_title": "Title Here", "blog_content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
  Blog.create({
    blog_title: req.body.blog_title,
    blog_content: req.body.blog_content,
    //TODO user_id: req.session.user_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO update blog

//TODO delete blog

module.exports = router;
