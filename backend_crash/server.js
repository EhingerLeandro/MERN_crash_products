import dotenv from "dotenv";
import express from "express";
import {connectDB} from "./config/db.js";
import routerProduct from "./routes/route.product.js";

// import Product from "./model/product.model.js";
// import mongoose from "mongoose";

dotenv.config(/*{ path: '../.env' }*/);

const app = express();
app.use(express.json()); // it parses the request

app.use("/api/products", routerProduct);

const PORT = process.env.PORT||5000;
app.listen(PORT, ()=>{
    connectDB();
    console.log(`El servidor esta escuchando el puerto: ${PORT}...`)
})
