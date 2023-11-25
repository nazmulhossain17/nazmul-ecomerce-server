const { hashPassword, comparePassword } = require("../helper/authHelper");
const UserModel = require("../models/user.schema");
const { errorResponse, successResponse } = require("./response.controller");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");

const handleRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name && !email && !password && !address) {
      return res.send({
        message: "name email password address is must required",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return errorResponse(res, {
        statusCode: 500,
        message: "User Already Exists please login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    return successResponse(res, {
      statusCode: 201,
      message: "User created Successfully",
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Invalid email or password",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Email not found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return errorResponse(res, {
        statusCode: 500,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ id: user._id }, jwtKey);
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .send({ message: "Login successful" });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = { handleRegister, handleLogin };
