const express = require("express");
const {
  handleRegister,
  handleLogin,
  getAllUsers,
  handleLogout,
  deleteUser,
  getSingleUser,
} = require("../controller/auth.controller");
const {
  isAdmin,
  isLoggedIn,
  isLoggedOut,
} = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register",  handleRegister);
authRouter.post("/login", isLoggedOut, handleLogin);
// authRouter.get("/user-info", isAdmin, getAllUsers);
authRouter.get("/user-info", getAllUsers);
authRouter.get("/user-info/:id", getSingleUser);
// authRouter.get("/logout", isLoggedIn, handleLogout);
authRouter.get("/logout", handleLogout);
// authRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteUser);
authRouter.delete("/delete/:id", deleteUser);

module.exports = authRouter;
