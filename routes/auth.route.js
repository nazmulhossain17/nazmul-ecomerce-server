const express = require("express");
const {
  handleRegister,
  handleLogin,
} = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);

module.exports = authRouter;
