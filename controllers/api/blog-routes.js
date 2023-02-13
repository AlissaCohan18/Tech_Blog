const router = require("express").Router();
const { Blog } = require("../../models");
const withAuth = require('../../utils/auth');

// get all blogs (include the post title and the date created)
router.get("/", (req, res) => {
  console.log("======================");
  Blog.findAll({
    attributes: ["blog_title", "created_at"],
    //display posts by created_at timestamp in descending order
     order: [["created_at", "DESC"]],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get blog by blog_ID - post title, contents, post creator’s username, and date created for that post
router.get("/:id", (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id,
      },
   //TODO: display creator's username 
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

//TODO get blog by userid (to display list of user's Blogs)


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
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete blog
router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Blog.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No Blog found with this id' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
