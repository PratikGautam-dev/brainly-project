import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoUri: string = process.env.MONGODB_URI || "";

if (!mongoUri) {
  throw new Error("❌ MONGODB_URI is not defined in the environment variables");
}

mongoose
  .connect(mongoUri) 
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


const UserSchema = new Schema({
    username: { type: String, index: { unique: true } },
    password: String
});

export const UserModel = model("User", UserSchema);
const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    type:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true}
})
const LinkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true,unique:true},
   
})
export const LinkModel=model("Links",LinkSchema)
export const ContentModel=model("Content",ContentSchema);
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

export const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};
