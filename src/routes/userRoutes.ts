import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
import User from '../models/userModel'; // Adjust the path as necessary
router.post('/', async (req:Request, res:Response) => {
    const { email, name, provider } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email, name, provider });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error creating/finding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;