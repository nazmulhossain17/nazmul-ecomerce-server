const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controller/product.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("APi working");
});

router.post("/create-product", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);

module.exports = router;
