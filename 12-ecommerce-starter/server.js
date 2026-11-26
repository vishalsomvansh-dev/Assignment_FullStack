require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const Product = mongoose.model("Product", new mongoose.Schema({
  name:{type:String,required:true}, description:String, price:{type:Number,required:true,min:0},
  image:String, stock:{type:Number,default:10}
},{timestamps:true}));
const Order = mongoose.model("Order", new mongoose.Schema({
  items:[{productId:mongoose.Schema.Types.ObjectId,name:String,price:Number,quantity:Number}],
  total:Number,status:{type:String,default:"Placed"}, paymentStatus:{type:String,default:"Mock / unpaid"}
},{timestamps:true}));

app.get("/api/products", async(req,res)=>{try{res.json(await Product.find())}catch(e){res.status(500).json({message:e.message})}});
app.post("/api/products", async(req,res)=>{try{res.status(201).json(await Product.create(req.body))}catch(e){res.status(400).json({message:e.message})}});
app.put("/api/products/:id", async(req,res)=>{try{const p=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!p)return res.sendStatus(404);res.json(p)}catch(e){res.status(400).json({message:e.message})}});
app.post("/api/orders", async(req,res)=>{
  try{
    if(!Array.isArray(req.body.items)||!req.body.items.length)return res.status(400).json({message:"Cart is empty"});
    const ids=req.body.items.map(i=>i.productId);
    const products=await Product.find({_id:{$in:ids}});
    const items=[];
    for(const line of req.body.items){
      const p=products.find(x=>x._id.toString()===line.productId);
      const quantity=Math.max(1,Math.floor(Number(line.quantity)||1));
      if(!p)return res.status(400).json({message:"A product is no longer available"});
      if(p.stock<quantity)return res.status(400).json({message:`Not enough stock for ${p.name}`});
      items.push({productId:p._id,name:p.name,price:p.price,quantity});
    }
    for(const line of items)await Product.updateOne({_id:line.productId},{$inc:{stock:-line.quantity}});
    const total=items.reduce((sum,i)=>sum+i.price*i.quantity,0);
    const order=await Order.create({items,total});
    res.status(201).json(order);
  }catch(e){res.status(500).json({message:e.message})}
});
app.get("/api/orders",async(req,res)=>{try{res.json(await Order.find().sort({createdAt:-1}))}catch(e){res.status(500).json({message:e.message})}});

mongoose.connect(process.env.MONGO_URI).then(async()=>{
  if(await Product.countDocuments()===0)await Product.insertMany([
    {name:"Notebook",description:"Hardcover ruled notebook",price:120,image:"https://picsum.photos/seed/notebook/400/250",stock:20},
    {name:"Water Bottle",description:"Reusable steel bottle",price:499,image:"https://picsum.photos/seed/bottle/400/250",stock:15},
    {name:"Desk Lamp",description:"LED study lamp",price:899,image:"https://picsum.photos/seed/lamp/400/250",stock:8}
  ]);
  app.listen(process.env.PORT||3000,()=>console.log("Shop running at http://localhost:3000"));
}).catch(e=>console.error(e.message));
