import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load environment variables with absolute path
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Attempting to connect with URI:', MONGODB_URI ? 'URI exists' : 'URI is undefined');

export async function connectDB() {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment");
    }

    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            retryWrites: true,
            w: 'majority',
        });
        
        console.log(`✅ MongoDB Connected to: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Schema definitions
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const ContentSchema = new Schema({
    title: String,
    link: String,
    type: {
        type: String,
        enum: ['youtube', 'twitter', 'instagram'],
        required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const LinkSchema = new Schema({
    hash: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});

// Export models
export const User = mongoose.model('User', UserSchema);
export const Content = mongoose.model('Content', ContentSchema);
export const Link = mongoose.model('Link', LinkSchema);
