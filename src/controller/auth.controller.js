const { hashPassword, comparePassword } = require("../helper/authHelper");
const UserModel = require("../models/user.schema");
const { errorResponse, successResponse } = require("./response.controller");
const jwt = require("jsonwebtoken");
const { jwtKey, refreshJwtKey } = require("../../config");
const prisma = require("../../prisma");

const handleRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !address) {
      return res.status(400).json({
        message: "name, email, password, and address are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
      },
    });
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ userId: user.id }, jwtKey);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          isAdmin: user.isAdmin,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({
      message: "All user data fetched",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userinfo = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userinfo) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(userinfo); // Use status code 200 for success
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    return successResponse(res, {
      statusCode: 200,
      message: "user log out successful",
      payload: {},
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming userId is of type Int in the database

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  getSingleUser,
  handleLogout,
  getAllUsers,
  deleteUser,
};
