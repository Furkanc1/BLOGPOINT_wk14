const withAuth = (req, res, next) => {
    if (!req.session.userId) {
      // redirect to login route
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  