import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: true
        },
        description: { 
            type: String, required: true 
        },
        price: { 
            type: Number, required: true 
        },
        category: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Category", 
            required: true 
        },
        User: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        location: { 
            type: String, 
            required: true 
        },
        contact: { 
            type: String, 
            required: true 
        },
        available: { 
            type: Boolean, 
            default: true 
        },
    },
    { timestamps: true }
);
export default mongoose.model("Service", serviceSchema);