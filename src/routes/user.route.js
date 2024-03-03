const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getUserProducts,
} = require("../controller/product.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("APi working");
});

router.post("/create-product", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.put('/product-update/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/own-product/:userId', getUserProducts);

module.exports = router;
