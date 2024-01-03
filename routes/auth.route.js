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

authRouter.post("/register", isLoggedOut, handleRegister);
authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.get("/user-info", isLoggedIn, isAdmin, getAllUsers);
authRouter.get("/logout", handleLogout);

module.exports = authRouter;
