const { hashPassword } = require("../helper/authHelper");
const UserModel = require("../models/user.schema");
const { errorResponse, successResponse } = require("./response.controller");

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
    errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = { handleRegister };
