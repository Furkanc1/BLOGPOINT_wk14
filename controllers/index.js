// requiring express.router (to create router instance)
const router = require(`express`).Router();

// imports all the routes in controllers to one file:
const userRoutes = require(`./api/user-routes`);
const postRoutes = require(`./api/user-routes`);
const commentRoutes = require(`./api/comment-routes`);
const homeRoutes = require(`./home-routes`);
const dashboardRoutes = require(`./dashboard-routes`);

// here well set up the routes for use
router.use(`/users`, userRoutes);
router.use(`/posts`, postRoutes);
router.use(`/comments`, commentRoutes);
router.use(`/home`, homeRoutes);
router.use(`/dashboard`, dashboardRoutes);

module.exports = router;
