import express from "express";
import {getProduct, putProduct, postProduct, deleteProduct} from "../controllers/product.controller.js"


const routerProduct = express.Router();

routerProduct.get("/", getProduct);

routerProduct.put("/:id", putProduct);

routerProduct.post("/", postProduct);

routerProduct.delete("/:id", deleteProduct);

export default routerProduct;