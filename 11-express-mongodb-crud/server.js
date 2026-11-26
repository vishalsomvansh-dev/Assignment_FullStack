require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true }
}, { timestamps: true });
const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  try { res.json(await Product.find().sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});
app.get("/products/:id", async (req, res) => {
  try { const p = await Product.findById(req.params.id); if (!p) return res.status(404).json({ message:"Not found" }); res.json(p); }
  catch (e) { res.status(400).json({ message:"Invalid product id" }); }
});
app.post("/products", async (req, res) => {
  try { const p = await Product.create(req.body); res.status(201).json(p); }
  catch (e) { res.status(400).json({ message:e.message }); }
});
app.put("/products/:id", async (req, res) => {
  try { const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true }); if (!p) return res.status(404).json({ message:"Not found" }); res.json(p); }
  catch (e) { res.status(400).json({ message:e.message }); }
});
app.delete("/products/:id", async (req, res) => {
  try { const p = await Product.findByIdAndDelete(req.params.id); if (!p) return res.status(404).json({ message:"Not found" }); res.json({ message:"Deleted successfully" }); }
  catch (e) { res.status(400).json({ message:"Invalid product id" }); }
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch(err => console.error("MongoDB connection error:", err.message));
