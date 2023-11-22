const Product = require("../models/product.schema");

const createProduct = async (req, res) => {
  const { name, company, price, image, description, category } = req.body;

  try {
    const product = new Product({
      name,
      company,
      price,
      image,
      description,
      category,
    });

    const createdData = await product.save();
    return res.status(201).json(createdData);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { createProduct };
