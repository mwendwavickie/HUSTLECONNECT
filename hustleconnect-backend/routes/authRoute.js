import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// @route   POST /api/auth/register
// @desc    Register a new user

const router = express.Router();

router.post('/register', async(req,res) => {
    const {name, email, password} = req.body;

    try{
        console.log("Received request:", req.body);

        //check if user already exists
        let user =  await User.findOne({ email });
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        user = new User ({
            name,
            email,
            password: hashedPassword,
        })
        await user.save();
        res.status(201).json({message: 'User registered successfully'});

    }catch(error) {
        console.error("Error in register:", error.message);

        res.status(500).json({message: "Server error"});
    }
});

// @route   POST /api/auth/login
// @desc    autheticate and Login a user

router.post ('/login', async(req,res) => {
    const {email, password} = req.body;
    console.log("Received request:", req.body); 

    try {
        const user = await User.findOne({email});
        console.log("User found:", user);
        if(!user) {
            return res.sendStatus(400).json({message: "User not found"});
        }
        if (!user.password){
            return res.status(500).json({message: "User has no password"});
        }

        //Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({messgae: "Invalid credentials"});
        }
        //Create a token
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token, user: {id: user._id, name: user.name, email: user.email}});

    } catch (error) {
        console.error("Error in login:", error);  // Log the error
        res.status(500).json({message: "Server error"});
    }
});

export default router;