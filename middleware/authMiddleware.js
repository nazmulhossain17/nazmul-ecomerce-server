const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");
const { errorResponse } = require("../controller/response.controller");
const UserModel = require("../models/user.schema");

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Missing token",
      });
    }
    const decoded = jwt.verify(req.headers.authorization, jwtKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user.isAdmin);
    if (!req.user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Error",
      });
    }
    next();
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Error finding user",
    });
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Please Login",
      });
    }
    const decoded = jwt.verify(token, jwtKey);
    // req.body.userId = decoded._id;
    // console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (token) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User is already logged in",
      });
    }

    next();
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = { requireSignIn, isAdmin, isLoggedIn, isLoggedOut };
