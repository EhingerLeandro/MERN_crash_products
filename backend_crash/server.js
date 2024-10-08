import dotenv from "dotenv";
import express from "express";
import {connectDB} from "./config/db.js";
import path from "path";
import routerProduct from "./routes/route.product.js";

// import Product from "./model/product.model.js";
// import mongoose from "mongoose";

dotenv.config(/*{ path: '../.env' }*/);

const app = express();
app.use(express.json()); // it parses the request, its a middleware
app.use("/api/products", routerProduct);

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "frontend_crash", "dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend_crash", "dist", "index.html"));
    })

}

const PORT = process.env.PORT||5000;
app.listen(PORT, ()=>{
    connectDB();
    console.log(`El servidor esta escuchando el puerto: ${PORT}...`)
})
