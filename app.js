const express = require("express");
const UserRouter = require("./routes/user.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const { errorResponse } = require("./controller/response.controller");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/v1/", UserRouter);
app.use("/api/auth/", authRouter);

app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
