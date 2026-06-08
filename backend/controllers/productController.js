import mongoose from "mongoose";
import Product from "../models/Product.js";
import demoProducts from "../data/demoProducts.js";

export const getProducts = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json(demoProducts);
  }

  const products = await Product.find({});
  res.json(products.length ? products : demoProducts);
};

export const addProduct = async (req, res) => {
  const { name, price, stock, category, image } = req.body;
  const product = new Product({ name, price, stock, category, image });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price ?? product.price;
  product.stock = req.body.stock ?? product.stock;
  product.category = req.body.category || product.category;
  product.image = req.body.image || product.image;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
};
