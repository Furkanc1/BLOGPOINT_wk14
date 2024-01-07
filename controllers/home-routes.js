const express = require("express");
const router = express.Router();
const { Post, Comment, User } = require("../models/");

// Route to get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts", { posts });
  } catch (err) {
    console.error("Error getting all posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get a single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render("single-post", { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error("Error getting single post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to render login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

// Route to render signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
});

module.exports = router;
