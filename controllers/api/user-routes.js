const router = require(`express`).Router();
const { User } = require(`../../models/User`);

// user sign-up:(postmethod)
router.post(`/signup`, async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ message: `Sign-up Successful!`, user: newUser });
  } catch (err) {
    console.log(`error at /signup (post) route`, err);
    res.status(500).json({ message: `error at /signup (post) route` }, err);
  }
});

// user log in route: (post)
router.post(`/login`, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData || !userData.checkPassword(req.body.password)) {
      return res.status(401).json({ message: "Incorrect email or password!" });
    }
    // authentication (session, will allow the user to be on the sessions for a certain amount of time, but if idle will destroy the session (handled in middleware that comes from express-session package));
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      // response to successful login
      res.status(201).json({ message: `Login Successful!`, user: userData });
    });
  } catch (err) {
    console.log(`error at /login (post) route`, err);
    res.status(500).json({ message: `error at /login (post) route` }, err);
  }
});

// logout route: (post)
router.post(`/logout`, async (req, res) => {
  try {
    // Destroys the session (logging user out)
    req.session.destroy(() => {
      res.status(200).json({ message: `Logged out successfully` });
    });
    // redirect user after logging out to the login screen
    res.redirect(`/login`);
  } catch (err) {
    console.log(`Error at /logout (post) route`, err);
    res.status(500).json({ message: `Error at /logout (post) route` }, err);
  }
});

// users dashboard route: (get)
router.get(`/dashboard`, async (req, res) => {
  try {
    // first check to see if the user is logged in:
    if (!req.session.logged_in) {
      // if user is not logged in, they will be redirected to the login screen before being able to view dashboard.
      return res.redirect(`/login`);
    }
    // else they will be presented with user dashboard with their blogposts
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: [`password`] },
      include: [
        { model: Post, attributes: [`id`, `title`, `content`, `createdAt`] },
      ],
    });

    // next will render the users dashboard
    res.render(`dashboard`, { userData });
  } catch (err) {
    console.log(`error in the /dashboard (get) route`, err);
    res
      .status(500)
      .json({ message: `error in the /dashboard (get) route` }, err);
  }
});

module.exports = router;
