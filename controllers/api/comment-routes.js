const router = require("express").Router();
const { Comment } = require("../../models");

//get all comments
router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//post new comment
router.post("/", (req, res) => {
  //expected input: {"comment_text": "This is the comment", "user_id": "1", "blog_id": "2"}
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    //TODO swap in user_id: req.session.user_id,
    blog_id: req.body.blog_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//delete a comment
router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No comment found with this id!" });
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
