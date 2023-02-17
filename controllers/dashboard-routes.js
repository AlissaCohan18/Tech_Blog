const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Provides route to Dashboard when logged in & displays the logged in user's blogs
router.get('/', withAuth, (req, res) => {
  Blog.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'blog_title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbData => {
        // serialize data before passing to template
        const blogs = dbData.map(blog => blog.get({ plain: true }));
        res.render('dashboard', { blogs, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//Loads page for editing Blog by ID
router.get("/edit/:id", withAuth, (req, res) => {
  Blog.findByPk(req.params.id, {
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
        res.render("edit_blog", {
          blog,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Update Blog Content
router.put("/edit/:id", withAuth, (req, res) => {
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
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete blog
router.delete('/edit/:id', withAuth, (req, res) => {
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
