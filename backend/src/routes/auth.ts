import { Router } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

router.post("/signup", async (req, res) => {
    try {
        console.log('Signup request received:', req.body);
        const { username, password } = req.body;
        const user = new UserModel({ username, password });
        await user.save();
        res.json({ message: "User created successfully" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: "Error creating user" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        console.log('Signin request received:', req.body);
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: "Error signing in" });
    }
});

export default router;
