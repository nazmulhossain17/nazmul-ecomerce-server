const Product = require("../models/product.schema");
const prisma = require("../../prisma");
const { successResponse, errorResponse } = require("./response.controller");

const createProduct = async (req, res) => {
  try {
    const { name, image, category, price, description, ownerId, sellerName } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        image,
        category,
        price,
        description,
        ownerId,
        sellerName
      },
    });

    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany(); // Use Prisma Client's findMany method
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } 
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product); // Use status code 200 for success
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: req.body, // Assuming req.body contains the updated product data
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    res.status(204).json({message: "Product deleted successfully"}); // No content response for successful deletion
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getUserProducts = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is part of the route params

    const userProducts = await prisma.user.findUnique({
      where: { id: userId },
      include: { products: true },
    });

    if (!userProducts) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ products: userProducts.products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getSingleProduct, getUserProducts, deleteProduct, updateProduct };
