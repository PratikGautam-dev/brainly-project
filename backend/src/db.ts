import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://gautampratik483:ToX8NF7rkJk5XtGM@cluster0.a1h3q.mongodb.net/brainly?retryWrites=true&w=majority";

export async function connectDB() {
    try {
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected:', conn.connection.host);
        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
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
