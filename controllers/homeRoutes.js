const router = require('express').Router();

const { Post, Comment, User } = require('../models');

// Route to get all posts for the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('homePage', {
       posts,
       logged_in: req.session.loggedIn,
     });
  } catch (error) {
    console.error('Error retrieving all posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get a single post
router.get('/post/:id', async (req, res) => {
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
      res.render('single-post', { 
        post,
        userId: req.session.userId,
        path: req.route.path,
        title: `BlogPoint`,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error('Error retrieving single post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
});

module.exports = router;
