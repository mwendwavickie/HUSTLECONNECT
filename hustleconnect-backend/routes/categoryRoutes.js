import express from "express";
import Category from "../models/Category.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//@route POST /api/categories
//@desc create a new category(Admin)
//@access Private

router.post("/", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin"){
        return res.status(401).json({ message : "Acess denied" });
    }

    try {
        const { name } = req.body;
        const category = new Category({ name});
        await category.save();
    } catch(error){
        res.status(500).json({ messgae: "server error"});
    }

});

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "server error"});
    }
});

export default router;

