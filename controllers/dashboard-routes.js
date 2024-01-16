const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.loggedIn
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({plain:true})
    res.render('edit', {
      ...post,
      logged_in: req.session.loggedIn
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
