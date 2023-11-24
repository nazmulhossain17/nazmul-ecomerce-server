const Product = require("../models/product.schema");

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
    return res.status(201).json(createdData);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createProduct, getAllProducts };
