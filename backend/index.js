require('dotenv').config();
"use strict";

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB with updated options
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit if connection fails
  });

// User Schema
const User = mongoose.model('User', {
    username: String,
    password: String
});

// Content Schema
const Content = mongoose.model('Content', {
    title: String,
    link: String,
    type: String,
    userId: String
});

// Add new Share Brain Schema
const Share = mongoose.model('Share', {
    userId: String,
    hash: String,
    active: Boolean
});

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({});
    }

    try {
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

// Auth routes
app.post('/api/v1/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'User created successfully' });
});

app.post('/api/v1/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(403).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
});

// Content routes
app.get('/api/v1/content', authMiddleware, async (req, res) => {
    const contents = await Content.find({ userId: req.userId });
    res.json({ content: contents });
});

app.post('/api/v1/content', authMiddleware, async (req, res) => {
    const { title, link, type } = req.body;
    const content = new Content({
        title,
        link,
        type,
        userId: req.userId
    });
    await content.save();
    res.json({ message: 'Content created successfully' });
});

app.delete('/api/v1/content/:contentId', authMiddleware, async (req, res) => {
    await Content.deleteOne({ _id: req.params.contentId, userId: req.userId });
    res.json({ message: 'Content deleted successfully' });
});

// Share brain routes
app.post('/api/v1/brain/share', authMiddleware, async (req, res) => {
    try {
        const hash = Math.random().toString(36).substring(2, 15);
        const share = new Share({
            userId: req.userId,
            hash,
            active: true
        });
        await share.save();
        res.json({ hash });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing brain' });
    }
});

app.get('/api/v1/brain/:hash', async (req, res) => {
    try {
        const share = await Share.findOne({ hash: req.params.hash, active: true });
        if (!share) {
            return res.status(404).json({ message: 'Share not found' });
        }
        const contents = await Content.find({ userId: share.userId });
        res.json({ content: contents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shared brain' });
    }
});

app.listen(process.env.PORT || 4000, () => console.log(`Server is running on port ${process.env.PORT || 4000}`));
