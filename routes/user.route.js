const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controller/product.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("APi working");
});

router.post("/create-product", createProduct);
router.get("/products", getAllProducts);

module.exports = router;
