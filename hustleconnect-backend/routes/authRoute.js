import express from 'express';
import bycrtpt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async(req,res) => {
    const {name, email, password} = req.body;

    try{
        //check if user already exists
        let user =  await User.findOne(email);
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }

        //Hash password
        const hashedPassword = await bycrtpt.hash(password, 10);

        //Create new user
        user = new User ({
            name,
            email,
            password: hashedPassword,
        })
        await user.save();
        res.status(201).json({message: 'User registered successfully'});

    }catch(error) {
        res.status(500).json({message: "Server error"});
    }
});

export default router;