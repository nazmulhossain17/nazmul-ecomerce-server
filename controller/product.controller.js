const Product = require("../models/product.schema");

const createProduct = async (req, res) => {
  const { name, company, price, images, description, category } = req.body;

  // Check if images is not present or not an array
  if (!images || !Array.isArray(images) || images.length > 4) {
    return res.status(400).json({
      error: "Images should be an array with at most 4 elements.",
    });
  }

  try {
    const product = new Product({
      name,
      company,
      price,
      images,
      description,
      category,
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
