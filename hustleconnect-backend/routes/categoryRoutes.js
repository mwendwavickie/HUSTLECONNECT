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
        console.log("Received request:", req.body); // Log request body

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }
        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const category = new Category({ name});
        await category.save();
        console.log("Category created:", category);
        res.status(201).json({ message: "Category added successfully", category });

    } catch(error){
        console.error("Error in POST /categories:", error);
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

