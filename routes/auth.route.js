const express = require("express");
const {
  handleRegister,
  handleLogin,
  getAllUsers,
  handleLogout,
} = require("../controller/auth.controller");
const {
  requireSignIn,
  isAdmin,
  isLoggedIn,
  isLoggedOut,
} = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.get("/user-info", isLoggedIn, getAllUsers);
authRouter.get("/logout", isLoggedIn, handleLogout);

module.exports = authRouter;
