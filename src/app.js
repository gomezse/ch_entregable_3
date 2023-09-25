import express from "express";
import { manager } from "./ProductManager.js";

const app = express();
const basePath = "/products";


app.use(express.json());

//default
app.get(`/`, async (req, res) => {
  try {
    res.status(200).json({ message: "Have a question about a product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//getAll
app.get(basePath, async (req, res) => {
  try {
    const products = await manager.getProducts(req.query);
    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//getById
app.get(`${basePath}/:pid`, async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await manager.getProductById(+pid);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found with the id provided" });
    }
    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    res.status(500).json({ message: "Product not found or not exist." });
  }
});


app.listen(8080, () => {
  console.log("Port: 8080");
});