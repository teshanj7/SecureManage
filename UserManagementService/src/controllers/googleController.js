const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/student"); // Adjust the model import if needed

// Google login route
exports.googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

// Google OAuth callback
exports.googleCallback = (req, res, next) => {
    passport.authenticate("google", async (err, user, info) => {
      if (err || !user) {
        // Redirect to failure URL if authentication failed or no user found
        return res.redirect(`${process.env.CLIENT_URL_FAIL}?success=false&message=Sign in failure`);
      }
  
      try {
        // Successfully authenticated, generate JWT token
        const token = jwt.sign({ email: user.Email, type: user.Type }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        // Redirect to client with token in the URL (hard-coded for testing)
        return res.redirect(`http://localhost:3000/google-login?token=${token}&success=true`);
      } catch (error) {
        console.error(error);
        return res.redirect(`${process.env.CLIENT_URL_FAIL}?success=false&message=Token generation failure`);
      }
    })(req, res, next);  // Properly pass req, res, and next
  };

// Login success response
exports.loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};

// Login failure response
exports.loginFailure = (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failed",
  });
};

// Logout user and redirect to client
exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: true, message: "Logout failed" });
    }
    res.redirect(`${process.env.CLIENT_URL}?logout=true`);
  });
};
