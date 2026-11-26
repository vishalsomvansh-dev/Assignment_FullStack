const express = require("express");
const app = express();
app.use(express.json());

let nextId = 3;
let products = [
  { id: 1, name: "Keyboard", price: 799, description: "USB keyboard" },
  { id: 2, name: "Mouse", price: 399, description: "Wireless mouse" }
];

// READ all and one
app.get("/products", (req, res) => res.json(products));
app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  product ? res.json(product) : res.status(404).json({ message: "Product not found" });
});
// CREATE
app.post("/products", (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price == null || !description) return res.status(400).json({ message: "name, price and description are required" });
  const product = { id: nextId++, name, price: Number(price), description };
  products.push(product);
  res.status(201).json(product);
});
// UPDATE
app.put("/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  Object.assign(product, req.body, { id: product.id });
  res.json(product);
});
// DELETE
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Product not found" });
  products.splice(index, 1);
  res.json({ message: "Product deleted" });
});
app.listen(3000, () => console.log("API at http://localhost:3000"));
