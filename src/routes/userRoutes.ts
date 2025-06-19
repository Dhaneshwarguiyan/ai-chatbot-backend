import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
const router = express.Router();
import User from '../models/userModel'; // Adjust the path as necessary

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User route is working' });
})

router.post('/signup',async (req:Request, res:Response) => {
    const {email , name, password} = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            email,
            name,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: 'Invalid email or password' });
            return;
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid email or password' });
        }
        // If the credentials are valid, return the user data (excluding password)
        const { password: _, ...userData } = user.toObject();
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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