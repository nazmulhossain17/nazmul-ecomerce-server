const express = require("express");
const { handleRegister } = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", handleRegister);

module.exports = authRouter;
