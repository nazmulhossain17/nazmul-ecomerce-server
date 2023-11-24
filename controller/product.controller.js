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

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

module.exports = { createProduct, getAllProducts, getSingleProduct };
