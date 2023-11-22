const express = require("express");
const { createProduct } = require("../controller/product.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("APi working");
});

router.post("/create-product", createProduct);

module.exports = router;
