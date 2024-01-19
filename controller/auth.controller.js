const { hashPassword, comparePassword } = require("../helper/authHelper");
const UserModel = require("../models/user.schema");
const { errorResponse, successResponse } = require("./response.controller");
const jwt = require("jsonwebtoken");
const { jwtKey, refreshJwtKey } = require("../config");

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
        statusCode: 400,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Email not found",
      });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ user }, jwtKey);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        samesite: "none",
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          image: user.image,
          bio: user.bio,
          phone: user.phone,
          isAdmin: user.isAdmin,
        },
      });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

// const handleLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return errorResponse(res, {
//         statusCode: 400,
//         message: "Email and password are required",
//       });
//     }

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return errorResponse(res, {
//         statusCode: 404,
//         message: "Email not found",
//       });
//     }

//     const passwordMatch = await comparePassword(password, user.password);

//     if (!passwordMatch) {
//       return errorResponse(res, {
//         statusCode: 401,
//         message: "Incorrect email or password",
//       });
//     }

//     const accessToken = jwt.sign({ user }, jwtKey, { expiresIn: "15m" }); // Set expiration for access token
//     const refreshToken = jwt.sign({ user }, refreshJwtKey, {
//       expiresIn: "12d",
//     }); // Set expiration for refresh token

//     res
//       .status(200)
//       .cookie("access_token", accessToken, { httpOnly: true }, '1d')
//       .cookie("refresh_token", refreshToken, {
//         httpOnly: true,
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         samesite: "none",
//       })
//       .json({
//         success: true,
//         message: "Login successful",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           address: user.address,
//           phone: user.phone,
//           isAdmin: user.isAdmin,
//         },
//       });
//   } catch (error) {
//     return errorResponse(res, {
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const products = await UserModel.find();
    return successResponse(res, {
      statusCode: 200,
      message: "alluser data fetched",
      payload: { products },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
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
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete the user
    await UserModel.findByIdAndDelete(userId);
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  getAllUsers,
  deleteUser,
};
