import mongoose from "mongoose";

// Hardcode the connection string for now to debug the issue
const MONGODB_URL = "mongodb+srv://gautampratik483:ToX8NF7rkJk5XtGM@cluster0.a1h3q.mongodb.net/brainly?retryWrites=true&w=majority";

export async function connectDB() {
    try {
        console.log('Attempting MongoDB connection...');
        
        // Clear any existing connections
        await mongoose.disconnect();
        
        // Set up MongoDB connection options
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000,
            socketTimeoutMS: 50000,
            family: 4  // Force IPv4
        };

        // Connect with explicit options
        const connection = await mongoose.connect(MONGODB_URL, options);
        
        // Verify connection
        await connection.connection.db.admin().ping();
        
        console.log('✅ MongoDB Connected to:', connection.connection.host);
        return true;
    } catch (error: any) {
        console.error('❌ MongoDB Connection Error:', {
            message: error.message,
            name: error.name,
            code: error.code
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
