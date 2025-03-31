import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "vendor", "admin"] , default: "customer" },
        
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);
export default mongoose.model('user', UserSchema);