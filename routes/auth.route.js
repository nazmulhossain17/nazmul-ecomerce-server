const express = require("express");
const {
  handleRegister,
  handleLogin,
  getAllUsers,
  handleLogout,
  deleteUser,
} = require("../controller/auth.controller");
const {
  isAdmin,
  isLoggedIn,
  isLoggedOut,
} = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register", isLoggedOut, handleRegister);
authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.get("/user-info", isAdmin, getAllUsers);
authRouter.get("/logout", isLoggedIn, handleLogout);
authRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteUser);

module.exports = authRouter;
