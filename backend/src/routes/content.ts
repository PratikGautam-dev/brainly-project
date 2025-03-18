import { Router } from "express";
import { ContentModel } from "../db";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const content = await ContentModel.find();
        res.json({ content });
    } catch (error) {
        res.status(500).json({ message: "Error fetching content" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, link, type, userId } = req.body;
        const content = new ContentModel({ title, link, type, userId });
        await content.save();
        res.json({ message: "Content created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating content" });
    }
});

export default router;
