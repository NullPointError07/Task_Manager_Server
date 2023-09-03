import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/users.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if a user with the same username already exists
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // If the username is unique, proceed to create the user
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Error during registration" });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if a user with the provided username exists
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Check if the provided password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate and send a JWT token upon successful login
        const token = jwt.sign({ id: user._id }, "secret");

        res.json({ token, userID: user._id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error during login" });
    }
});




export { router as userRouter }

