import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        icon: {
            type: String,
            default: "apps", // Default icon if not provided
        },
    },
    { timestamps: true }
);

export default mongoose.model("Category", categorySchema);