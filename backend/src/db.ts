import mongoose from "mongoose";

const uri = "mongodb+srv://gautampratik483:ToX8NF7rkJk5XtGM@cluster0.a1h3q.mongodb.net/brainly?retryWrites=true&w=majority";

export async function connectDB() {
    console.log('MongoDB URI:', uri.replace(/:([^:@]{24})@/, ':****@')); // Log URI safely
    
    try {
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        
        if (connection.connection.readyState === 1) {
            console.log('MongoDB Connected Successfully');
            return true;
        }
        
        throw new Error('MongoDB connection failed');
    } catch (error: any) {
        console.error('MongoDB Connection Error:', {
            message: error.message,
            code: error.code,
            name: error.name
        });
        return false;
    }
}

// Schema definitions
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const ContentSchema = new mongoose.Schema({
    title: String,
    link: String,
    type: {
        type: String,
        enum: ['youtube', 'twitter', 'instagram'],
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const LinkSchema = new mongoose.Schema({
    hash: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});

// Export models
export const User = mongoose.model('User', UserSchema);
export const Content = mongoose.model('Content', ContentSchema);
export const Link = mongoose.model('Link', LinkSchema);
