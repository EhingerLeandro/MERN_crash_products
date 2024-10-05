import Product from "../model/product.model.js";
import mongoose from "mongoose";

/*---GET---*/
export const getProduct = async(req, res)=>{
    try{
        const products = await Product.find({}) //This sintax ({}) allows to bring all the data
        res.status(200)
        // .send(products)  //This cannot be used while working with .json()
        .json({success:true, data:products})
    }catch(error){
        console.log("Error getting the product ", error.message);
        res.status(404).json({success:false, message:"server error"});
    }
}

/*---PUT---*/
export const putProduct = async(req, res)=>{
    const {id} = req.params;
    const product = req.body;
    //sintáxis  propia de mongoose, usada para validar si id falla
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Product Id"});
    }
    try{
         const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
         res.status(200).json({success:true, data: updatedProduct});
    }
    // el catch es para errores en la comunicación con el servidor
    catch(error){ 
        res.status(500).json({success:false, message: " Product couldn't be updated"});
    }
}

/*---POST---*/
export const postProduct = async(req, res)=>{
    /*req.body -> user will send this data using a form, product will be an object */
    const product = req.body; 
    if(!product.name|| !product.price || !product.image){
      return  res.status(404).json({success:false, message:"Please, provide all fields"});
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    }catch(error){
        console.error("Error in create product: ", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

/*---DELETE---*/
export const deleteProduct = async (req, res)=>{
    const {id} = req.params;
    //sintáxis  propia de mongoose, usada para validar si id falla
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Product Id"});
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product deleted"});
    }catch(error){
        res.status(500).json({success:false, message:"Server error"});
    }
}