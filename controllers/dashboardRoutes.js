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
    console.error('Error retrieving posts:', error);
    res.redirect('login');
  }
});

router.get('edit', withAuth, (req, res) => {
  res.render('admin-new-post', {
    layout: 'dashboard',
    title: 'New Post',
    userId: req.session.userId,
    path: req.route.path
  });
});

module.exports = router;
