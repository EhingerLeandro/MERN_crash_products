import express from "express";
import Product from "../model/product.model.js";
import {getProduct, putProduct, postProduct, deleteProduct} from "../controllers/product.controller.js"
import mongoose from "mongoose";

const routerProduct = express.Router();

routerProduct.get("/", getProduct);

routerProduct.put("/:id", putProduct);

routerProduct.post("/", postProduct);

routerProduct.delete("/:id", deleteProduct);

export default routerProduct;