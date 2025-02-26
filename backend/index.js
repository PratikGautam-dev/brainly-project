"use strict";

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/brainly');

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

const JWT_SECRET = "secret123";

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

app.listen(4000, () => console.log('Server is running on port 4000'));
