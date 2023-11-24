const express = require("express");
const UserRouter = require("./routes/user.route");
const cors = require("cors");
const authRouter = require("./routes/auth.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/v1/", UserRouter);
app.use("/api/auth/", authRouter);

module.exports = app;
