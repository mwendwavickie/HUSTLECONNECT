import express from "express";
import Service from "../models/Service.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/services
// @desc    Create a new service (Vendor only)
// @access  Private (Vendor)

router.post ("/", authMiddleware, async (req, res) => {
    // Check if the user is a vendor
    if (req.user.role !== "vendor") {
        return res.status(403).json({ message: "Acess denied" });  
    }
    try{
        const { title, description, price, category, location } = req.body;
        const service = new Service ({
            title,
            description,
            price,
            category,
            User: req.user._id, // Vendor Id
            location,
        });
        await service.save();
        res.status(201).json({ message: "Service created successfully" });
    }catch (error){
        res.status(500).json({ message: "Server error" });
    }
});

// @route GET/api/services
// @desc Get all services with category filter
// @access Public
router.get("/", async (req, res)=> {
    try {
        const {category} = req.query;
        const filter = category ? { category} : {};
        
        const services = await Service.find(filter).populate("category", "name").populate("category", "name").populate("user", "name", "email");
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate("category","name").populate("user","name email");
        if (!service) {
            return res.status(404).json({ message: "Service not found"});

        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
});

router.put("/:id", authMiddleware, async(req, res) => {
    if (req.user.role !== "vendor") {
        return res.status(403).json({ message: "Acess denied" });
    }
    try{
        const service = await Service.findById(req.params.id);
        if(!service) {
            return res.status(404).json({ message: "Service not found"});
        }

        if (service.user.toString() !== req.user.id){
            return res.status(403).json({ message: "Unauthorized" });
        }
        const { title, description, price, category, location } = req.body;
        service.title = title;
        service.description = description;
        service.price = price;
        service.category = category;
        service.location = location;

        await service.save();
        res.json({ message: "Service updated successfully"});

    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    if(req.user.role !== "vendor") {
        return res.status(403).json({ message: "Acess denied" });
    }

    try{
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        if (service.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await service.remove();
        res.json({ message: "Service deleted successfully" });
    }catch(error) {
        res.status(500).json({ message: "Server error"});
    }
});

export default router;




