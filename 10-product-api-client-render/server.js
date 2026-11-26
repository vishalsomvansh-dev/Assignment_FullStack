const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));
let nextId = 3;
let products = [
  { id: 1, name: "Laptop", price: 55000, rating: 4.5 },
  { id: 2, name: "Headphones", price: 1500, rating: 4.2 }
];
app.get("/api/products", (req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const { name, price, rating } = req.body;
  if (!name || !Number.isFinite(Number(price)) || !Number.isFinite(Number(rating)))
    return res.status(400).json({ message: "Enter valid name, price and rating" });
  const product = { id: nextId++, name, price: Number(price), rating: Number(rating) };
  products.push(product);
  res.status(201).json(product);
});
app.listen(3000, () => console.log("Open http://localhost:3000"));