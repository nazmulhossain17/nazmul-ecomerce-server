const Product = require("../models/product.schema");
const { successResponse, errorResponse } = require("./response.controller");

const createProduct = async (req, res) => {
  const { name, price, image, features, status, rating } = req.body;

  try {
    const product = new Product({
      name,
      image,
      price,
      features,
      status,
      rating,
    });
    const createdData = await product.save();
    // return res.status(201).json(createdData);
    return successResponse(res, {
      statusCode: 201,
      message: "product created successful",
      payload: { createdData },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findOne({ _id: id });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result); // Use status code 200 for success
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = { createProduct, getAllProducts, getSingleProduct };
