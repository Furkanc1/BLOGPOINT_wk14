const router = require("express").Router();
const { User, Post } = require("../../models");

// Dashboard route to render the user's blog posts
router.get("/", async (req, res) => {
  try {
    // here we check if the user is logged in
    if (!req.session.logged_in) {
      return res.redirect("/login"); // redirects to login if not logged in
    }

    // Find the user by their ID and include their posts on dashboard
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Post, attributes: ["id", "title", "content", "createdAt"] },
      ],
    });

    // Render the dashboard view with user data
    res.render("dashboard", { userData });
  } catch (err) {
    console.error("Error in the /dashboard route:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
