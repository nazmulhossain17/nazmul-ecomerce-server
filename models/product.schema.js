const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // Array of strings (image URLs)
      required: true,
      validate: {
        validator: function (value) {
          // Validate that there are at most 4 images
          return value.length <= 4;
        },
        message: "Images array should contain at most 4 images.",
      },
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
