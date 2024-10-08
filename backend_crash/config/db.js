import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const uri = String(process.env.MONGODB_URI)
        const connect = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1); // process code 1 code means exit with failure
    }
}